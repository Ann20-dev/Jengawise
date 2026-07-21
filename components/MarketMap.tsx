"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { pipelineProjects, properties } from "@/lib/data";

type MarkerType = "properties" | "pipeline" | "both";

type MarketMapProps = {
  compact?: boolean;
};

type BoundaryFeature = {
  properties: {
    adm2_name: string;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};

type BoundarySummary = {
  name: string;
  propertyUnits: number;
  pipelineUnits: number;
  projectCount: number;
};

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function pointInRing([longitude, latitude]: [number, number], ring: number[][]) {
  let inside = false;

  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [currentLongitude, currentLatitude] = ring[index];
    const [previousLongitude, previousLatitude] = ring[previous];
    const intersects =
      currentLatitude > latitude !== previousLatitude > latitude &&
      longitude < ((previousLongitude - currentLongitude) * (latitude - currentLatitude)) / (previousLatitude - currentLatitude) + currentLongitude;

    if (intersects) inside = !inside;
  }

  return inside;
}

function pointInBoundary(point: [number, number], geometry: BoundaryFeature["geometry"]) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates as number[][][]] : geometry.coordinates as number[][][][];

  return polygons.some((polygon) => pointInRing(point, polygon[0]) && !polygon.slice(1).some((ring) => pointInRing(point, ring)));
}

function getBoundarySummary(feature: BoundaryFeature): BoundarySummary {
  const containedProperties = properties.filter((property) => pointInBoundary(property.coordinates, feature.geometry));
  const containedPipeline = pipelineProjects.filter((project) => pointInBoundary(project.coordinates, feature.geometry));

  return {
    name: feature.properties.adm2_name,
    propertyUnits: containedProperties.reduce((total, property) => total + property.units, 0),
    pipelineUnits: containedPipeline.reduce((total, project) => total + project.units, 0),
    projectCount: containedProperties.length + containedPipeline.length
  };
}

export function MarketMap({ compact = false }: MarketMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  const boundaryPopupRef = useRef<mapboxgl.Popup | null>(null);
  const [markerType, setMarkerType] = useState<MarkerType>("both");
  const [selectedBoundary, setSelectedBoundary] = useState<BoundarySummary | null>(null);

  const points = useMemo(() => {
    const propertyPoints = properties.map((property) => ({
      id: property.id,
      name: property.name,
      zone: property.zone,
      units: property.units,
      coordinates: property.coordinates,
      kind: "Property"
    }));

    const pipelinePoints = pipelineProjects.map((project) => ({
      id: project.id,
      name: project.name,
      zone: project.zone,
      units: project.units,
      coordinates: project.coordinates,
      kind: "Pipeline"
    }));

    if (markerType === "properties") return propertyPoints;
    if (markerType === "pipeline") return pipelinePoints;
    return [...propertyPoints, ...pipelinePoints];
  }, [markerType]);

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [36.8219, -1.2921],
      zoom: 10.6
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    boundaryPopupRef.current = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10 });

    map.on("load", async () => {
      try {
        const response = await fetch("/data/nairobi-sub-counties.geojson");
        if (!response.ok) return;

        const boundaries = await response.json();
        map.addSource("nairobi-sub-counties", { type: "geojson", data: boundaries });
        map.addLayer({
          id: "nairobi-sub-counties-fill",
          type: "fill",
          source: "nairobi-sub-counties",
          paint: { "fill-color": "#2e6b57", "fill-opacity": 0.08 }
        });
        map.addLayer({
          id: "nairobi-sub-counties-outline",
          type: "line",
          source: "nairobi-sub-counties",
          paint: { "line-color": "#2e6b57", "line-width": 1.4, "line-opacity": 0.72 }
        });

        map.on("mouseenter", "nairobi-sub-counties-fill", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mousemove", "nairobi-sub-counties-fill", (event) => {
          const feature = event.features?.[0] as unknown as BoundaryFeature | undefined;
          if (!feature) return;
          boundaryPopupRef.current
            ?.setLngLat(event.lngLat)
            .setHTML(`<strong>${feature.properties.adm2_name}</strong><br/>Nairobi sub-county`)
            .addTo(map);
        });
        map.on("mouseleave", "nairobi-sub-counties-fill", () => {
          map.getCanvas().style.cursor = "";
          boundaryPopupRef.current?.remove();
        });
        map.on("click", "nairobi-sub-counties-fill", (event) => {
          const feature = event.features?.[0] as unknown as BoundaryFeature | undefined;
          if (feature) setSelectedBoundary(getBoundarySummary(feature));
        });
      } catch {
        // The marker map remains available if the boundary asset cannot load.
      }
    });

    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      boundaryPopupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = points.map((point) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className =
        point.kind === "Property"
          ? "h-4 w-4 rounded-sm border-2 border-white bg-moss shadow-lg"
          : "h-4 w-4 rounded-full border-2 border-white bg-clay shadow-lg";
      element.setAttribute("aria-label", `${point.name} marker`);

      return new mapboxgl.Marker(element)
        .setLngLat(point.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 14 }).setHTML(
            `<strong>${point.name}</strong><br/>${point.zone}<br/>${point.units.toLocaleString()} units`
          )
        )
        .addTo(mapRef.current as mapboxgl.Map);
    });
  }, [points]);

  return (
    <section className="rounded-lg border border-line bg-paper shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-ink">Interactive Supply Map</h2>
          <p className="text-sm text-ink/62">Properties, pipeline, and Nairobi sub-county boundaries.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-line bg-field p-1">
          <SlidersHorizontal size={16} className="ml-2 text-ink/55" aria-hidden="true" />
          {(["both", "properties", "pipeline"] as MarkerType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMarkerType(type)}
              className={`rounded px-3 py-1.5 text-xs font-semibold capitalize transition ${
                markerType === type ? "bg-ink text-white" : "text-ink/62 hover:text-ink"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {token ? (
        <>
          <div ref={containerRef} className={compact ? "h-[360px]" : "h-[560px]"} />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 text-xs text-ink/60">
            <p>Hover for a sub-county name; click a boundary for its tracked supply summary.</p>
            <a
              href="https://data.humdata.org/dataset/cod-ab-ken"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-moss hover:text-ink"
            >
              Boundary data: HDX
            </a>
          </div>
          {selectedBoundary ? (
            <div className="grid gap-3 border-t border-line bg-field px-5 py-4 sm:grid-cols-4">
              <p className="text-sm font-semibold text-ink">{selectedBoundary.name}</p>
              <p className="text-sm text-ink/68">{selectedBoundary.propertyUnits.toLocaleString()} property units</p>
              <p className="text-sm text-ink/68">{selectedBoundary.pipelineUnits.toLocaleString()} pipeline units</p>
              <p className="text-sm text-ink/68">{selectedBoundary.projectCount} tracked projects</p>
            </div>
          ) : null}
        </>
      ) : (
        <div className={`relative overflow-hidden grid-paper street-lines ${compact ? "h-[360px]" : "h-[560px]"}`}>
          <div className="absolute inset-0 bg-paper/38" />
          {points.map((point, index) => {
            const left = `${18 + ((index * 13) % 66)}%`;
            const top = `${16 + ((index * 19) % 68)}%`;
            const propertyMarker = point.kind === "Property";
            return (
              <div
                key={point.id}
                className="absolute max-w-[180px] rounded-md border border-line bg-paper/95 px-3 py-2 shadow-panel"
                style={{ left, top }}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md text-white ${
                      propertyMarker ? "bg-moss" : "bg-clay"
                    }`}
                  >
                    <MapPin size={14} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold leading-4 text-ink">{point.name}</p>
                    <p className="text-[11px] leading-4 text-ink/58">
                      {point.zone} · {point.units.toLocaleString()} units
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="absolute bottom-4 left-4 rounded-md border border-line bg-paper/95 px-3 py-2 text-xs font-medium text-ink/70">
            Add NEXT_PUBLIC_MAPBOX_TOKEN for live Mapbox tiles.
          </div>
        </div>
      )}
    </section>
  );
}
