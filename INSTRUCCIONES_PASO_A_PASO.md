# Guía Completa: Agente Inteligente GitHub + Jira + Gemini

## PASO 1: Configura tus Tokens (5 minutos)

### 1.1 Edita el archivo config/local.ts

Abre: `config/local.ts`

Busca estas líneas y reemplaza con tus valores reales:

\`\`\`typescript
// GitHub Token
token: "ghp_TU_TOKEN_AQUI",

// Jira API Token
apiToken: "TU_JIRA_TOKEN_AQUI",

// Jira Email
email: "tu-email@tuempresa.com",

// Jira Domain
domain: "tu-empresa.atlassian.net",

// Gemini API Key
apiKey: "TU_GEMINI_API_KEY_AQUI",
\`\`\`

### 1.2 Donde obtener cada token:

**GitHub Token:**
1. Ve a https://github.com/settings/tokens/new
2. Dale nombre: "Blueprint Agent"
3. Marca: ✓ repo, ✓ workflow
4. Expiracion: 90 días
5. Copia el token (comienza con `ghp_`)

**Jira API Token:**
1. Ve a https://id.atlassian.com/manage-profile/security/api-tokens
2. Haz clic en "Create API token"
3. Dale nombre: "Blueprint Agent"
4. Copia el token (comienza con `ATATT`)

**Gemini API Key:**
1. Ve a https://aistudio.google.com/app/apikeys
2. Haz clic en "Get API Key"
3. Selecciona o crea un proyecto
4. Copia la API Key (comienza con `AIza`)

**Jira Email y Domain:**
1. Tu email es el que usas para Jira
2. Tu domain lo encuentras en la URL de Jira: `https://tu-empresa.atlassian.net`

---

## PASO 2: Crea un Proyecto en Jira (10 minutos)

### 2.1 Crear el Proyecto

1. Ve a https://www.atlassian.com/software/jira/free
2. Haz clic en "Create project"
3. Selecciona: **Kanban** (no Scrum)
4. Nombre: "Blueprints"
5. Clave: **BP** (importante, úsalo en config/local.ts)
6. Haz clic en "Create"

### 2.2 Verificar las columnas del tablero

Después de crear el proyecto, deberías ver 3 columnas:
- **To Do** (POR HACER)
- **In Progress** (EN CURSO)
- **Done** (FINALIZADO)

Si no las ves, ve a Board → Column Configuration y asegúrate de que estén.

---

## PASO 3: Crear Tareas de Ejemplo en Jira

### 3.1 Primera Tarea: Blueprint para Stripe

1. Haz clic en "Create" (botón azul)
2. Rellena los campos:

\`\`\`
Project: Blueprints
Issue Type: Story
Summary: Blueprint para integración de pagos con Stripe
Description:
La aplicación necesita un blueprint para manejar pagos usando Stripe API.

Debe incluir:
- Formulario para datos de pago (tarjeta, CVC, fecha expiración)
- Validación de números de tarjeta
- Integración con Stripe API
- Manejo de errores y respuestas de pago

APIs Disponibles:
- Stripe (necesita API key, pero es pública)

Campos necesarios:
- cardNumber
- cardholderName
- expiryMonth
- expiryYear
- cvv
- amount
- currency
\`\`\`

3. Haz clic en "Create"
4. Después de crear, haz clic en el ticket
5. Haz clic en "To Do" (columna) y cámbialo a "In Progress"

### 3.2 Segunda Tarea: Blueprint para Google Maps

1. Haz clic en "Create" nuevamente
2. Rellena:

\`\`\`
Project: Blueprints
Issue Type: Story
Summary: Blueprint para geolocalización con Google Maps API
Description:
Necesitamos un blueprint para captar ubicación del usuario usando Google Maps.

Características:
- Campo para mostrar mapa interactivo
- Búsqueda de direcciones
- Guardado de coordenadas (latitud, longitud)
- Validación de formato de dirección
- Autocompletado de direcciones

APIs Disponibles:
- Google Maps Geocoding API (pública)

Campos necesarios:
- address
- latitude
- longitude
- placeId
- country
- city
\`\`\`

3. Cámbialo a "In Progress"

### 3.3 Tercera Tarea: Blueprint para OpenWeather

1. Haz clic en "Create"
2. Rellena:

\`\`\`
Project: Blueprints
Issue Type: Story
Summary: Blueprint para datos de clima en tiempo real
Description:
Crear un blueprint que consuma datos de clima usando OpenWeatherMap API.

Características:
- Campo para buscar ciudad
- Mostrar temperatura, humedad, velocidad del viento
- Icono del clima
- Validación de ciudad válida
- Búsqueda predictiva

APIs Disponibles:
- OpenWeatherMap (API pública y gratuita)

Campos necesarios:
- city
- temperature
- humidity
- windSpeed
- weatherDescription
- weatherIcon
\`\`\`

3. Cámbialo a "In Progress"

---

## PASO 4: Ejecuta el Agente Localmente

### 4.1 Instala dependencias

\`\`\`bash
npm install
\`\`\`

### 4.2 Inicia el servidor

\`\`\`bash
npm run dev
\`\`\`

### 4.3 Abre el panel del agente

\`\`\`
http://localhost:3000/agent
\`\`\`

Deberías ver una página con:
- Un botón verde: "✓ Configuración válida"
- Un botón azul: "Ejecutar Agente"

Si ves un mensaje rojo de error, revisa que todos los tokens estén correctos en `config/local.ts`

### 4.4 Presiona "Ejecutar Agente"

El agente va a:

1. Leer las 3 tareas en "In Progress" de Jira
2. Para cada tarea:
   - Analizar si es posible hacerla (con Gemini)
   - Si SÍ: Crear rama → Generar código → Crear PR → Comentar en Jira
   - Si NO: Buscar desarrollador y asignarlo

### 4.5 Revisa los resultados

En la página del agente verás una tarjeta para cada tarea:

**Ejemplo si se completó:**
\`\`\`
Título: Blueprint para integración de pagos con Stripe
Estado: ✓ Completado (verde)

Rama: feat/blueprint-stripe-payment-1735862400000
PR: https://github.com/JuliRSDev/blueprints-with-agent/pull/5
\`\`\`

**Ejemplo si se asignó:**
\`\`\`
Título: Blueprint para SendGrid
Estado: ⚠ Asignado (azul)

Asignado a: Juan Developer
Razón: Requiere configuración de backend adicional en SendGrid
\`\`\`

### 4.6 Revisa Jira

En tu tablero de Jira en la columna "In Progress" verás comentarios del agente explicando qué pasó:

**Si se completó:**
\`\`\`
Agent completed this task!

Branch: feat/blueprint-stripe-payment-1735862400000
PR: https://github.com/JuliRSDev/blueprints-with-agent/pull/5

The blueprint has been generated and is ready for review.
\`\`\`

**Si se asignó:**
\`\`\`
Agent Analysis: This task requires the following resources: SendGrid backend configuration

Assigned to: Juan Developer

Reason: Requires additional backend setup to integrate SendGrid API
\`\`\`

### 4.7 Revisa GitHub

Ve a tu repositorio en GitHub y verás:

1. **Nuevas ramas**: `feat/blueprint-stripe-payment-...`, `feat/blueprint-google-maps-...`, etc.
2. **Nuevos PRs**: Los PRs creados automáticamente por el agente
3. **Código generado**: Los blueprints están en `scaffolders/blueprints/`

---

## SOLUCIÓN DE PROBLEMAS

### Error: "Configuración incompleta"

**Solución:** Edita `config/local.ts` y verifica que:
- Token de GitHub comience con `ghp_`
- Token de Jira comience con `ATATT`
- Email de Jira sea válido
- Domain de Jira sea `tu-empresa.atlassian.net` (sin https)
- API Key de Gemini comience con `AIza`

### Error: "Failed to fetch from Jira"

**Solución:**
- Verifica que el proyecto "Blueprints" exista en Jira
- Verifica que la clave sea "BP"
- Verifica que el email y token sean correctos
- Intenta acceder directamente a: `https://tu-empresa.atlassian.net/rest/api/3/search?jql=project=BP`

### Error: "Failed to fetch from GitHub"

**Solución:**
- Verifica que el repositorio exista
- Verifica que el token tenga permisos de `repo` y `workflow`
- Verifica que el owner y repo sean correctos

### El agente no crea PRs

**Solución:**
- Verifica que tu rama `main` exista en GitHub
- Verifica que tengas permisos para crear PRs
- Mira los logs en la consola del navegador

---

## Próximos Pasos

Una vez que veas que el agente funciona:

1. **Revisa los blueprints generados** en `scaffolders/blueprints/`
2. **Revisa los PRs** en GitHub
3. **Aprueba los PRs** que sean correctos
4. **Crea más tareas** en Jira para que el agente las procese
5. **Personaliza el agente** según tus necesidades

¡Listo! Tu agente inteligente está funcionando.
