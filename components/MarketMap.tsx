"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { pipelineProjects, properties } from "@/lib/data";

type MarkerType = "properties" | "pipeline" | "both";

type MarketMapProps = {
  compact?: boolean;
};

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function MarketMap({ compact = false }: MarketMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  const [markerType, setMarkerType] = useState<MarkerType>("both");

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
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [36.8219, -1.2921],
      zoom: 10.6
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
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
          <p className="text-sm text-ink/62">Properties and construction pipeline by zone.</p>
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
        <div ref={containerRef} className={compact ? "h-[360px]" : "h-[560px]"} />
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
