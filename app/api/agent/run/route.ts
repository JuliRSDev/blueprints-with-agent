import { runAgent } from "@/lib/agent-orchestrator"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const results = await runAgent()
    return NextResponse.json({ results, success: true })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}
