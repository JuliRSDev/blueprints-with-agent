import { generateText } from "ai"
import { GEMINI_CONFIG } from "@/config/local"

export async function analyzeTask(taskDescription: string, codeContent: string) {
  try {
    const prompt = `Eres un experto en desarrollo de software. Analiza la siguiente tarea y el código del proyecto para determinar si es posible completarla.

TAREA:
${taskDescription}

CÓDIGO EXISTENTE DEL PROYECTO (scaffolders/blueprints):
${codeContent}

Por favor analiza:
1. ¿Es técnicamente posible crear este blueprint con las APIs y recursos disponibles?
2. ¿Hay APIs faltantes o recursos que no se pueden conseguir?
3. ¿Qué campos y validaciones se necesitarían?
4. ¿Cuál sería la estructura del blueprint siguiendo la arquitectura existente?

Responde en formato JSON con esta estructura:
{
  "canImplement": true/false,
  "difficulty": "easy" | "medium" | "hard",
  "requiredAPIs": ["API1", "API2"],
  "missingResources": ["recurso1", "recurso2"],
  "suggestedFields": ["field1", "field2"],
  "blueprintStructure": "descripción de la estructura",
  "reasoning": "explicación detallada",
  "suggestedDeveloper": "tipo de desarrollador recomendado (backend/frontend/fullstack)"
}`

    const { text } = await generateText({
      model: GEMINI_CONFIG.model,
      prompt,
      temperature: 0.7,
      apiKey: GEMINI_CONFIG.apiKey,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("[v0] Error analyzing task:", error)
    throw error
  }
}

export async function generateBlueprintCode(taskDescription: string, blueprintName: string, suggestedFields: string[]) {
  try {
    const prompt = `Eres un experto en TypeScript y React. Genera el código para un blueprint siguiendo esta estructura:

NOMBRE DEL BLUEPRINT: ${blueprintName}
DESCRIPCIÓN: ${taskDescription}
CAMPOS SUGERIDOS: ${suggestedFields.join(", ")}

Genera un archivo TypeScript que siga el patrón del proyecto:
- Tipo: export const ${blueprintName}Blueprint
- Debe tener: name, description, fields array
- Cada field tiene: name, type, label, placeholder, validation, required

Responde SOLO con el código TypeScript válido, sin markdown ni explicaciones.`

    const { text } = await generateText({
      model: GEMINI_CONFIG.model,
      prompt,
      temperature: 0.7,
      apiKey: GEMINI_CONFIG.apiKey,
    })

    return text
  } catch (error) {
    console.error("[v0] Error generating blueprint code:", error)
    throw error
  }
}
