# COMIENZA AQUÍ - Guía Rápida

Tu agente inteligente está **100% listo para usar**. Solo necesitas cambiar los tokens.

## En 30 Minutos Tendrás Todo Funcionando

### Paso 1: Obtén tus 3 Tokens (15 minutos)

**GitHub Token:**
- Ve a https://github.com/settings/tokens/new
- Marca: repo, workflow
- Copia el token (comienza con `ghp_`)

**Jira API Token:**
- Ve a https://id.atlassian.com/manage-profile/security/api-tokens
- Click en "Create API token"
- Copia el token (comienza con `ATATT`)

**Gemini API Key:**
- Ve a https://aistudio.google.com/app/apikeys
- Click en "Get API Key"
- Copia la key (comienza con `AIza`)

### Paso 2: Configura los Tokens en el Código (5 minutos)

Abre: `config/local.ts`

Busca y reemplaza SOLO estas líneas con tus valores reales:

\`\`\`typescript
token: "ghp_AQUI_TU_TOKEN_DE_GITHUB",  // Cambio aquí ↓
↓
token: "ghp_abc123def456ghi789...",  // Tu token real
\`\`\`

Lo mismo con:
- `apiToken` (Jira)
- `email` (tu email de Jira)
- `domain` (tu dominio Jira)
- `apiKey` (Gemini)

### Paso 3: Crea un Proyecto en Jira (5 minutos)

1. Ve a https://www.atlassian.com/software/jira/free
2. Click en "Create project"
3. Selecciona "Kanban"
4. Nombre: "Blueprints"
5. Clave: **BP** (importante!)
6. Click en "Create"

### Paso 4: Crea Tareas de Ejemplo (5 minutos)

Lee: `EJEMPLOS_JSON_JIRA.md` 

O simplemente crea 3 tareas manualmente:
- Blueprint para Stripe
- Blueprint para Google Maps
- Blueprint para OpenWeather

**Importante:** Después de crear cada tarea, cámbiala a la columna "In Progress"

### Paso 5: Ejecuta el Agente (2 minutos)

\`\`\`bash
npm install
npm run dev
\`\`\`

Luego ve a: `http://localhost:3000/agent`

Presiona el botón "Ejecutar Agente" y mira la magia suceder!

---

## Qué Pasará

El agente va a:

1. Leer las tareas en Jira que estén en "In Progress"
2. Usar Gemini para analizar si puede hacerlas
3. Para cada tarea:
   - ✅ Si puede: Crear rama → Generar código → Hacer PR → Comentar
   - ❌ Si no puede: Asignar a un desarrollador

---

## Documentación Completa

Si necesitas más detalles:

- `INSTRUCCIONES_PASO_A_PASO.md` - Todo explicado paso a paso
- `EJEMPLOS_JSON_JIRA.md` - Ejemplos de tareas
- `CHECKLIST_FINAL.md` - Verificación antes de ejecutar
- `README_FINAL.md` - Información general

---

## ¿Listo?

1. Obtén los 3 tokens (15 min)
2. Edita `config/local.ts` (2 min)
3. Crea el proyecto Jira (5 min)
4. Crea 3 tareas en Jira (5 min)
5. Ejecuta `npm run dev` (1 min)
6. Abre `http://localhost:3000/agent`
7. Presiona "Ejecutar Agente"

**¡Listo! Tu agente está funcionando!**

---

Cualquier duda, revisa la sección "Solución de Problemas" en `INSTRUCCIONES_PASO_A_PASO.md`
