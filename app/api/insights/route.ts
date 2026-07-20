import { NextResponse } from "next/server";
import { demandForecasts, insights, pipelineProjects, properties } from "@/lib/data";
import { Insight } from "@/lib/types";

export async function POST() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ insights, source: "fallback" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "You are a real estate market intelligence analyst. Return only compact JSON with an insights array. Each insight has title, body, and impact where impact is opportunity, risk, or watch."
          },
          {
            role: "user",
            content: JSON.stringify({
              properties,
              pipelineProjects,
              demandForecasts
            })
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "jengawise_insights",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                insights: {
                  type: "array",
                  minItems: 3,
                  maxItems: 4,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      title: { type: "string" },
                      body: { type: "string" },
                      impact: { type: "string", enum: ["opportunity", "risk", "watch"] }
                    },
                    required: ["title", "body", "impact"]
                  }
                }
              },
              required: ["insights"]
            }
          }
        }
      })
    });

    if (!response.ok) {
      return NextResponse.json({ insights, source: "fallback" });
    }

    const payload = await response.json();
    const outputText = payload.output_text as string | undefined;
    const parsed = outputText ? (JSON.parse(outputText) as { insights: Insight[] }) : { insights };

    return NextResponse.json({ insights: parsed.insights, source: "openai" });
  } catch {
    return NextResponse.json({ insights, source: "fallback" });
  }
}
