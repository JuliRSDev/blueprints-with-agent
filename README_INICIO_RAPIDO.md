# INICIO RÁPIDO: Agente Inteligente Local

¡Bienvenido! Esta es la guía más corta para empezar. Para guías detalladas, lee los otros archivos.

## 3 Pasos Rápidos

### Paso 1: Edita tu configuración (5 min)

Abre `config/local.ts` y reemplaza:

\`\`\`typescript
// Tu GitHub token
token: "ghp_AQUI_TU_TOKEN_GITHUB",

// Tu Jira API token
apiToken: "ATATT_AQUI_TU_TOKEN_JIRA",

// Tu email Jira
email: "tu-email@example.com",

// Tu dominio Jira (sin https://)
domain: "tu-empresa.atlassian.net",

// Tu Gemini API Key
apiKey: "AIzaSy_AQUI_TU_API_KEY_GEMINI",
\`\`\`

### Paso 2: Crea tareas en Jira (10 min)

En https://jira.tudominio.com:

1. Crear proyecto "Blueprints" (Kanban, clave: BP)
2. Crear 3+ tareas en la columna "EN CURSO"
3. Detallar bien cada tarea

Ver `GUIA_JIRA_COMPLETA.md` para ejemplos.

### Paso 3: Ejecuta el agente (5 min)

\`\`\`bash
npm install
npm run dev
# Abre http://localhost:3000/agent
# Haz clic en "Ejecutar Agente"
\`\`\`

¡Listo! El agente trabajará por ti.

---

## ¿Qué pasa?

- Lee tareas de Jira (EN CURSO)
- Analiza si son posibles (Gemini)
- Si SÍ: Crea rama → código → PR en GitHub
- Si NO: Asigna a un desarrollador

---

## Archivos Importantes

- `config/local.ts` ← TU CONFIGURACIÓN (edítala aquí)
- `GUIA_CONFIGURACION_LOCAL.md` ← Paso a paso detallado
- `GUIA_JIRA_COMPLETA.md` ← Cómo crear tareas perfectas
- `GUIA_EJECUCION_AGENTE.md` ← Cómo ejecutar y solucionar errores

---

## Problemas?

Lee `GUIA_EJECUCION_AGENTE.md` sección "Errores Comunes".

¡Buena suerte!
