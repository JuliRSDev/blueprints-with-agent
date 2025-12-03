# Agente Inteligente: GitHub + Jira + Gemini

Un agente automatizado que:

1. Lee tareas en "En Curso" de Jira
2. Analiza si puede hacerlas con Gemini
3. Si SÍ: Crea rama, genera código, hace PR
4. Si NO: Asigna a un desarrollador

## Requisitos

- Node.js 16+
- GitHub Personal Access Token
- Jira API Token
- Google Gemini API Key

## Instalación Rápida

### 1. Configura los Tokens

Edita `config/local.ts`:

\`\`\`typescript
export const GITHUB_CONFIG = {
  token: "ghp_TU_TOKEN",
  owner: "TU_USUARIO",
  repo: "TU_REPO",
}

export const JIRA_CONFIG = {
  apiToken: "ATATT_TU_TOKEN",
  email: "tu@email.com",
  domain: "tu-empresa.atlassian.net",
  projectKey: "BP",
  boardId: "1",
}

export const GEMINI_CONFIG = {
  apiKey: "AIza_TU_KEY",
  model: "google/gemini-2.0-flash",
}
\`\`\`

### 2. Instala

\`\`\`bash
npm install
\`\`\`

### 3. Ejecuta

\`\`\`bash
npm run dev
\`\`\`

### 4. Abre

\`\`\`
http://localhost:3000/agent
\`\`\`

### 5. Presiona "Ejecutar Agente"

## Archivos Importantes

- `config/local.ts` - Tu configuración (edita aquí)
- `lib/github-service.ts` - Integración con GitHub
- `lib/jira-service.ts` - Integración con Jira
- `lib/gemini-service.ts` - Análisis con Gemini
- `lib/agent-orchestrator.ts` - Lógica principal del agente
- `app/agent/page.tsx` - Panel del agente
- `app/api/agent/run/route.ts` - Endpoint para ejecutar

## Documentación Completa

Lee estos archivos en orden:

1. `INSTRUCCIONES_PASO_A_PASO.md` - Guía paso a paso
2. `EJEMPLOS_JSON_JIRA.md` - Ejemplos de tareas
3. `CHECKLIST_FINAL.md` - Verificación antes de ejecutar

## Soporte

Si tienes problemas:

1. Revisa `INSTRUCCIONES_PASO_A_PASO.md` → "Solución de Problemas"
2. Verifica que todos los tokens sean correctos
3. Abre la consola del navegador (F12) para ver errores
4. Revisa los logs en la terminal
