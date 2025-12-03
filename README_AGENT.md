# Blueprint Agent - Automatiza la Creación de Blueprints 🤖

Un agente inteligente que automatiza la creación de blueprints en tu aplicación React. Lee tareas en Jira, analiza si se pueden implementar usando Gemini AI, y automáticamente:

- ✅ Crea ramas en GitHub
- ✅ Genera código de blueprints
- ✅ Hace Pull Requests
- ✅ O asigna tareas a desarrolladores si necesitan recursos adicionales

---

## Características Principales

| Característica | Descripción |
|---|---|
| **Análisis Inteligente** | Usa Gemini para analizar si una tarea se puede implementar |
| **Automatización Completa** | Crea ramas, código, y PRs sin intervención manual |
| **Asignación Inteligente** | Si falta algo, asigna automáticamente a desarrolladores |
| **Integración GitHub** | Crea ramas, archivos y PRs directamente |
| **Integración Jira** | Lee tareas, comenta resultados, asigna tickets |
| **Escalable** | Procesa múltiples tareas en paralelo |

---

## Requisitos Previos

- Node.js 18+
- Cuenta de GitHub
- Cuenta de Jira
- Cuenta de Google (para Gemini)
- Cuenta de Vercel (para deploy)

---

## Instalación Rápida

### 1. Obtener Credenciales

Lee el archivo `SETUP_COMPLETO.md` para obtener:
- GitHub Personal Access Token
- Jira API Token
- Google Gemini API Key

### 2. Configurar Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables del paso 1

### 3. Crear Tareas en Jira

Usa los ejemplos en `JIRA_EJEMPLOS_JSON.md` para crear tareas.

### 4. Ejecutar

\`\`\`bash
# Local
npm install
npm run dev
# Abre http://localhost:3000/agent

# O en Vercel (automático)
\`\`\`

---

## Flujo de Trabajo

\`\`\`
┌─────────────────┐
│  Tareas en Jira │
│   (IN PROGRESS) │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Agente Analiza con Gemini AI   │
│  ¿Se puede implementar?         │
└────┬────────────────────────┬───┘
     │ SÍ                     │ NO
     ▼                        ▼
┌──────────────────┐  ┌──────────────────────┐
│ Generar Blueprint│  │ Buscar Desarrollador │
│ Crear Rama       │  │ Asignar Tarea        │
│ Hacer PR         │  │ Comentar en Jira     │
└──────────────────┘  └──────────────────────┘
\`\`\`

---

## Ejemplos de Uso

### Ejemplo 1: Blueprint Simple (Implementable)

**Tarea Jira:**
\`\`\`
Título: Blueprint para notificaciones
Descripción: Crear formulario para enviar notificaciones usando SendGrid
Estado: IN PROGRESS
\`\`\`

**Resultado:**
- ✅ Rama creada: `feat/blueprint-notificaciones-1234567890`
- ✅ Archivo: `scaffolders/blueprints/notificaciones-blueprint.ts`
- ✅ PR abierto con código automático
- ✅ Comentario en Jira con link

### Ejemplo 2: Blueprint Complejo (No Implementable)

**Tarea Jira:**
\`\`\`
Título: Blueprint para visión por computadora
Descripción: Detectar objetos en imágenes usando ML
Estado: IN PROGRESS
\`\`\`

**Resultado:**
- ❌ Necesita: TensorFlow.js o API especial
- ✅ Asignado a: "Carlos API" (especialista en ML)
- ✅ Comentario en Jira explicando por qué

---

## Estructura del Código

\`\`\`
app/
├── agent/
│   └── page.tsx           # Dashboard del agente
├── api/
│   └── agent/
│       └── run/
│           └── route.ts   # Endpoint para ejecutar agente
└── ...

lib/
├── github-service.ts      # Servicio de GitHub
├── jira-service.ts        # Servicio de Jira
├── gemini-service.ts      # Servicio de Gemini
└── agent-orchestrator.ts  # Lógica principal del agente

scaffolders/
├── blueprints/            # Blueprints generados
├── components/
│   └── form-builder.tsx   # Constructor de formularios
└── types/
    └── index.ts           # Tipos TypeScript
\`\`\`

---

## Variables de Entorno

\`\`\`env
# GitHub
GITHUB_TOKEN=           # Token personal de GitHub
GITHUB_OWNER=          # Tu usuario de GitHub
GITHUB_REPO=           # Nombre del repositorio

# Jira
JIRA_API_TOKEN=        # Token de API de Jira
JIRA_EMAIL=            # Tu email de Jira
JIRA_DOMAIN=           # Tu dominio de Jira
JIRA_PROJECT_KEY=      # Clave del proyecto (ej: BP)
JIRA_BOARD_ID=         # ID del tablero

# Gemini
GEMINI_API_KEY=        # API Key de Google Gemini
\`\`\`

---

## Solución de Problemas

### Error: "Failed to run agent"
Verifica que todas las variables de entorno estén configuradas correctamente en Vercel.

### Error: "Invalid GitHub token"
El token puede haber expirado o ser incorrecto. Crea uno nuevo.

### Error: "Cannot connect to Jira"
Verifica que tu dominio de Jira sea correcto (debe incluir `.atlassian.net`).

---

## API Reference

### POST /api/agent/run

Ejecuta el agente una sola vez.

**Request:**
\`\`\`bash
curl -X POST http://localhost:3000/api/agent/run
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "results": [
    {
      "issueKey": "BP-1",
      "taskName": "Blueprint para Pagos",
      "status": "completed",
      "details": {
        "branchName": "feat/blueprint-pagos-123",
        "prUrl": "https://github.com/..."
      }
    }
  ]
}
\`\`\`

---

## Tips y Mejores Prácticas

1. **Describe bien tus tareas en Jira**
   - Usa nombres claros y descriptivos
   - Incluye los campos necesarios
   - Menciona las APIs a usar

2. **Mantén las credenciales seguras**
   - Nunca hagas commit de `.env`
   - Usa solo variables de entorno
   - Rota los tokens regularmente

3. **Revisa los PRs del agente**
   - El agente genera buen código pero revisa siempre
   - Ajusta según tu estilo de código
   - Mergealo o pide cambios

4. **Escalala gradualmente**
   - Empieza con blueprints simples
   - Agrega más tareas cuando estés seguro
   - Monitorea los logs

---

## FAQ

**¿El agente puede hacer PRs incorrectos?**
Sí, revisa siempre los PRs antes de mergearlos. Gemini es inteligente pero no perfecto.

**¿Qué APIs están soportadas?**
Cualquier API pública. El agente las analizará y determinará si es implementable.

**¿Puedo customizar el agente?**
Sí, edita `lib/agent-orchestrator.ts` para agregar lógica personalizada.

**¿Es gratis?**
Sí, todas las APIs usadas tienen tier gratuito (GitHub, Jira, Gemini, Vercel).

---

## Soporte

Si tienes preguntas o problemas:
1. Lee `SETUP_COMPLETO.md`
2. Revisa los logs en la consola del navegador
3. Abre un issue en GitHub

---

**Creado con ❤️ usando Next.js, Vercel AI SDK y TypeScript**
