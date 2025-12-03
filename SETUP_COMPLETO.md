# Guía Completa: Agente Inteligente Blueprints con Jira, GitHub y Gemini

Este documento te guiará paso a paso en la configuración completa del agente.

---

## PARTE 1: OBTENER LOS TOKENS Y CREDENCIALES 🔐

### 1.1 GitHub Personal Access Token

**¿Qué es?** Un token que permite al agente acceder a tu repositorio, crear ramas, archivos y Pull Requests.

**Pasos:**

1. Accede a https://github.com/settings/tokens/new
2. Completa los campos:
   - **Note:** "Blueprint Agent"
   - **Expiration:** 90 days
3. Marca estas casillas:
   \`\`\`
   ✓ repo (Full control of private repositories)
   ✓ workflow (Update GitHub Action workflows)
   ✓ admin:repo_hook (Full control of repository hooks)
   \`\`\`
4. Haz clic en "Generate token"
5. **IMPORTANTE:** Copia el token inmediatamente. Se ve así:
   \`\`\`
   ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r
   \`\`\`
6. Guárdalo en un lugar seguro (lo necesitarás en Vercel)

**Prueba de validación:**
\`\`\`bash
curl -H "Authorization: token TU_TOKEN" https://api.github.com/user
# Debe mostrar tu información de GitHub
\`\`\`

---

### 1.2 Jira API Token

**¿Qué es?** Un token que permite al agente interactuar con tu tablero de Jira (leer tareas, asignar, comentar).

**Pasos:**

1. Ve a https://id.atlassian.com/manage-profile/security/api-tokens
2. Haz clic en "Create API token"
3. Dale el nombre: "Blueprint Agent"
4. Copia el token. Se ve así:
   \`\`\`
   ATATT3xFfGH0o1j2k3l4m5n6o7p8q9r0s1t2u3v4w
   \`\`\`
5. Guárdalo en un lugar seguro

**Necesitarás también:**
- **Tu email de Atlassian:** El email con el que registraste tu cuenta (ej: tu-email@gmail.com)
- **Tu dominio de Jira:** Normalmente es `tu-empresa.atlassian.net`
- **Project Key:** En tu tablero, arriba a la izquierda. Ej: `BP` (Blueprint)

**Obtener el Project Key:**
1. Ve a tu tablero de Jira
2. Arriba a la izquierda verás algo como "Blueprint (BP)"
3. El código entre paréntesis es tu Project Key

---

### 1.3 Google Gemini API Key

**¿Qué es?** La API Key que permite al agente usar Gemini para analizar código y generar blueprints automáticamente.

**Pasos:**

1. Ve a https://aistudio.google.com/app/apikeys
2. Haz clic en "Get API Key"
3. Si aparece un modal, haz clic en "Create a new API key in a new Google Cloud project"
4. Copia la API Key. Se ve así:
   \`\`\`
   AIzaSyDxWqJkKdL0m1n2o3p4q5r6s7t8u9v0w1x
   \`\`\`
5. Guárdalo en un lugar seguro

**Nota:** La API de Gemini es gratuita con límites generosos (50 requests/min).

---

## PARTE 2: CONFIGURAR VARIABLES EN VERCEL ⚙️

Ahora agregarás todas las credenciales a tu proyecto en Vercel.

**Pasos:**

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto "blueprints-with-agent"
3. Haz clic en **Settings** (esquina superior derecha)
4. En el menú izquierdo, haz clic en **Environment Variables**
5. Agrega cada una de estas variables:

\`\`\`
Nombre: GITHUB_TOKEN
Valor: ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r

Nombre: GITHUB_OWNER
Valor: JuliRSDev

Nombre: GITHUB_REPO
Valor: blueprints-with-agent

Nombre: JIRA_API_TOKEN
Valor: ATATT3xFfGH0o1j2k3l4m5n6o7p8q9r0s1t2u3v4w

Nombre: JIRA_EMAIL
Valor: tu-email@ejemplo.com

Nombre: JIRA_DOMAIN
Valor: tu-dominio.atlassian.net

Nombre: JIRA_PROJECT_KEY
Valor: BP

Nombre: JIRA_BOARD_ID
Valor: 1

Nombre: GEMINI_API_KEY
Valor: AIzaSyDxWqJkKdL0m1n2o3p4q5r6s7t8u9v0w1x
\`\`\`

**Pasos para agregar cada variable:**
1. Haz clic en "Add New"
2. Escribe el nombre exacto (sensible a mayúsculas)
3. Pega el valor
4. Selecciona "Production" y "Preview"
5. Haz clic en "Save"

---

## PARTE 3: CONFIGURAR JIRA 📋

### Paso 1: Crear un Proyecto

1. Ve a https://www.atlassian.com/software/jira/free
2. Haz clic en "Get started"
3. Completa el formulario de registro (o inicia sesión si ya tienes cuenta)
4. Dale nombre: "Blueprints"
5. Tipo de proyecto: **Kanban**
6. Haz clic en "Create"

### Paso 2: Asegúrate que tu tablero tenga estas 3 columnas

1. En tu tablero, debe decir "Kanban" en el tipo
2. Las columnas deben ser:
   - **TO DO** (Por Hacer)
   - **IN PROGRESS** (En Curso)
   - **DONE** (Finalizado)

**Si no las tiene**, edita el tablero (hay un botón de engranaje):
1. Haz clic en el engranaje ⚙️
2. Ve a "Columns"
3. Asegúrate que tenga estas 3 columnas

### Paso 3: Obtener tu Project Key

1. En tu tablero, en la parte superior izquierda verás algo como:
   \`\`\`
   Blueprints (BP)
   \`\`\`
2. El código entre paréntesis es tu **Project Key**: `BP`
3. Guarda este valor (ya lo deberías tener en Vercel)

### Paso 4: Obtener tu Board ID

1. En tu tablero, mira la URL:
   \`\`\`
   https://tu-dominio.atlassian.net/software/c/projects/BP/boards/1
   \`\`\`
2. El último número es tu **Board ID**: `1`
3. Guarda este valor (ya debería estar en Vercel)

---

## PARTE 4: CREAR TAREAS DE EJEMPLO EN JIRA 📝

### Tarea 1: Blueprint para Pagos con Stripe

\`\`\`
Título: Blueprint para integración de pagos con Stripe
Descripción:
---
La aplicación necesita un blueprint para manejar pagos usando Stripe.

Requisitos:
- Formulario para datos de pago (tarjeta, CVC, fecha de expiración)
- Validación de datos bancarios
- Integración con API de Stripe
- Manejo de errores y respuestas

Campos necesarios:
- cardNumber (text, validación de tarjeta)
- cvv (text, exactamente 3-4 dígitos)
- expiryDate (date)
- amount (number)
- currency (select: USD, EUR, MXN)

API disponible:
- Stripe API (necesita STRIPE_KEY, pero es pública)

---
Tipo: Story
Prioridad: Alta
Estado: IN PROGRESS
\`\`\`

### Tarea 2: Blueprint para Geolocalización

\`\`\`
Título: Blueprint para geolocalización usando Google Maps API
Descripción:
---
Necesitamos un blueprint para captar la ubicación del usuario usando Google Maps.

Especificaciones:
- Campo para mostrar mapa interactivo
- Búsqueda de direcciones
- Guardado de coordenadas (lat, lng)
- Validación de formato de dirección
- Integración con Google Maps Geocoding API

Campos necesarios:
- address (text con búsqueda)
- latitude (number)
- longitude (number)
- placeId (text)
- placeName (text)

API disponible:
- Google Maps Geocoding API (gratuita)

---
Tipo: Story
Prioridad: Alta
Estado: IN PROGRESS
\`\`\`

### Tarea 3: Blueprint para Clima en Tiempo Real

\`\`\`
Título: Blueprint para datos de clima usando OpenWeatherMap
Descripción:
---
Crear un blueprint que consuma datos de clima en tiempo real.

Características:
- Campo para ciudad/código postal
- Mostrar temperatura, humedad, viento
- Icono del clima
- Validación de ciudad válida
- Búsqueda predictiva de ciudades

Campos necesarios:
- city (text con autocompletado)
- temperature (number, read-only)
- humidity (number, read-only)
- windSpeed (number, read-only)
- description (text, read-only)
- weatherIcon (image, read-only)

API disponible:
- OpenWeatherMap API (gratuita con key)

---
Tipo: Story
Prioridad: Media
Estado: IN PROGRESS
\`\`\`

### Tarea 4: Blueprint para Email con SendGrid

\`\`\`
Título: Blueprint para envío de email con SendGrid
Descripción:
---
Blueprint para validar y enviar emails usando SendGrid.

Requerimientos:
- Campo para email del remitente
- Campo para email del destinatario
- Asunto del email
- Cuerpo del mensaje (editor rich text)
- Validación de emails
- Manejo de errores de envío

Campos necesarios:
- to (email, validado)
- from (email, validado)
- subject (text, max 100)
- body (textarea, max 5000)
- cc (email, opcional)
- bcc (email, opcional)

API disponible:
- SendGrid API (necesita API Key, gratuita)

---
Tipo: Story
Prioridad: Media
Estado: TO DO
\`\`\`

**Cómo crear estas tareas:**

1. En tu tablero de Jira, haz clic en "Create"
2. Completa los campos:
   - Tipo: Story
   - Título: Copia el título
   - Descripción: Copia la descripción (sin el "---")
   - Prioridad: Copia la prioridad
3. Haz clic en "Create"
4. Agrega la tarea al tablero en la columna correcta arrastrándola

---

## PARTE 5: CREAR DESARROLLADORES EN JIRA 👥

1. Ve a tu tablero de Jira
2. Haz clic en Settings ⚙️
3. En el menú izquierdo, selecciona "Users and roles"
4. Haz clic en "Invite users"
5. Agrega estos usuarios (o usa existentes):

\`\`\`
1. Nombre: Juan Developer
   Email: juan.developer@company.com
   Role: Developer

2. Nombre: María Backend
   Email: maria.backend@company.com
   Role: Developer

3. Nombre: Carlos API
   Email: carlos.api@company.com
   Role: Developer
\`\`\`

**Nota:** Si no tienes estos usuarios reales, el agente usará los que encuentre disponibles.

---

## PARTE 6: EJECUTAR EL AGENTE 🚀

### Opción A: Local (para desarrollo)

\`\`\`bash
# 1. Clona tu repositorio
git clone https://github.com/JuliRSDev/blueprints-with-agent
cd blueprints-with-agent

# 2. Instala dependencias
npm install

# 3. Crea un archivo .env.local en la raíz
# y agrega todas las variables del Paso 2

# 4. Ejecuta el proyecto
npm run dev

# 5. Ve a http://localhost:3000
# Haz clic en "Ir al Agente"
# Presiona "Ejecutar Agente"
\`\`\`

### Opción B: En Vercel (producción)

\`\`\`bash
# El agente se ejecuta automáticamente cuando:
# 1. Haces push a main
# 2. Accedes a /agent y haces clic en "Ejecutar Agente"
\`\`\`

---

## PARTE 7: QUÉ HACE EL AGENTE 🤖

Cuando ejecutas el agente:

1. **Obtiene tareas** en estado "IN PROGRESS" de Jira
2. **Analiza cada tarea** usando Gemini AI:
   - ¿Se puede implementar con APIs disponibles?
   - ¿Faltan recursos o APIs?
   - ¿Cuál es la dificultad?
3. **Si se puede implementar:**
   - Crea una nueva rama en GitHub
   - Genera el código del blueprint automáticamente
   - Crea el archivo en tu repositorio
   - Hace un Pull Request
   - Comenta en la tarea de Jira con el link
4. **Si NO se puede implementar:**
   - Busca desarrolladores disponibles
   - Asigna la tarea al más adecuado
   - Comenta en Jira explicando por qué

---

## PARTE 8: SOLUCIÓN DE PROBLEMAS 🔧

### Error: "Failed to run agent"

**Posibles causas:**
1. Las variables de entorno no están configuradas correctamente
2. Los tokens han expirado
3. Jira está inaccesible

**Solución:**
- Ve a Vercel > Settings > Environment Variables
- Verifica que todos los valores sean correctos
- Los tokens deben tener espacios al inicio/final eliminados

### Error: "Invalid GitHub token"

**Solución:**
\`\`\`bash
# En tu máquina local, prueba:
curl -H "Authorization: token TU_TOKEN" https://api.github.com/user
# Si dice 401, tu token es inválido. Crea uno nuevo en GitHub
\`\`\`

### Error: "Cannot read issues from Jira"

**Solución:**
1. Verifica que tu email y dominio sean correctos
2. Verifica que tu token no haya expirado
3. Prueba accediendo manualmente a tu tablero en https://tu-dominio.atlassian.net

### El agente no encuentra tareas

**Solución:**
1. Ve a tu tablero de Jira
2. Asegúrate de que al menos una tarea esté en "IN PROGRESS"
3. Verifica que el Project Key sea correcto (en Vercel)

---

## PARTE 9: FLUJO COMPLETO EJEMPLO 📊

**Escenario:** Quieres agregar un blueprint para "Pagos con Stripe"

**Paso 1:** En Jira
- Creas una tarea: "Blueprint para integración de pagos con Stripe"
- La pones en estado "IN PROGRESS"

**Paso 2:** En la App
- Accedes a http://localhost:3000/agent
- Haces clic en "Ejecutar Agente"

**Paso 3:** El Agente hace:
\`\`\`
1. Lee tu tarea en Jira
2. Analiza con Gemini si es posible
3. Como Stripe tiene API pública disponible:
   - Crea rama: feat/blueprint-pagos-con-stripe-1234567890
   - Genera el archivo: scaffolders/blueprints/pagos-blueprint.ts
   - Hace Push a GitHub
   - Crea Pull Request
   - Comenta en Jira con el link al PR
4. Tú revisa el PR en GitHub
5. Aprueba el PR para mergearlo a main
6. Listo! El blueprint está en tu app
\`\`\`

---

## RESUMEN DE CREDENCIALES NECESARIAS 📋

\`\`\`
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_OWNER=JuliRSDev
GITHUB_REPO=blueprints-with-agent

JIRA_API_TOKEN=ATATT3xxxxxxxxxxx
JIRA_EMAIL=tu-email@ejemplo.com
JIRA_DOMAIN=tu-dominio.atlassian.net
JIRA_PROJECT_KEY=BP
JIRA_BOARD_ID=1

GEMINI_API_KEY=AIzaSyxxxxxxxxxx
\`\`\`

---

**¿Necesitas ayuda?** Abre un issue en GitHub o revisa los logs del agente en la consola.
