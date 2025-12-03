import { validateConfig } from "@/config/local"

export async function POST() {
  const { valid, errors } = validateConfig()

  return Response.json({
    valid,
    errors,
  })
}
