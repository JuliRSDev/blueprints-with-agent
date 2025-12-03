# GUÍA COMPLETA: Configuración Local del Agente

## Paso 1: Obtener tus 3 Tokens

### 1.1 GitHub Personal Access Token

1. Ve a: https://github.com/settings/tokens/new
2. Dale nombre: "Agent Blueprint Creator"
3. Selecciona estas opciones:
   - [x] repo (acceso completo al repositorio)
   - [x] workflow (para crear ramas y PRs)
   - [x] admin:repo_hook (webhooks)
4. Expiración: 90 días (recomendado)
5. Haz clic en "Generate token"
6. COPIA EL TOKEN (no lo cierres, necesitarás pegarlo)

El token se verá así: `ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r`

### 1.2 Jira API Token

1. Ve a: https://id.atlassian.com/manage-profile/security/api-tokens
2. Haz clic en "Create API token"
3. Dale nombre: "Blueprint Agent"
4. Se generará automáticamente
5. COPIA EL TOKEN

El token se verá así: `ATATT3xFfGH0o1j2k3l4m5n6o7p8q9r0s`

También necesitarás:
- Tu EMAIL de la cuenta Atlassian
- Tu DOMINIO: Entra a Jira → En la URL verás algo como `https://tu-empresa.atlassian.net`
  Copia solo: `tu-empresa.atlassian.net`

### 1.3 Google Gemini API Key

1. Ve a: https://aistudio.google.com/app/apikeys
2. Haz clic en "Get API Key" (si no tienes proyecto, créa uno)
3. Selecciona tu proyecto
4. Se generará automáticamente
5. COPIA LA API KEY

La API Key se verá así: `AIzaSyDxWqJkKdL0m1n2o3p4q5r6s7t8u9v0w1x`

---

## Paso 2: Configurar config/local.ts

1. Abre el archivo: `config/local.ts`
2. Reemplaza los valores de ejemplo:

\`\`\`typescript
export const GITHUB_CONFIG = {
  token: "AQUI_PEGA_TU_GITHUB_TOKEN",      // ghp_xxxx
  owner: "JuliRSDev",                      // Tu usuario GitHub (puede ser otro)
  repo: "blueprints-with-agent",           // Tu repositorio
}

export const JIRA_CONFIG = {
  apiToken: "AQUI_PEGA_TU_JIRA_TOKEN",    // ATATT3xxx
  email: "AQUI_TU_EMAIL_JIRA",            // tu-email@example.com
  domain: "AQUI_TU_DOMINIO_JIRA",         // tu-empresa.atlassian.net
  projectKey: "BP",                        // Clave del proyecto
  boardId: "1",                            // ID del tablero
}

export const GEMINI_CONFIG = {
  apiKey: "AQUI_PEGA_TU_GEMINI_API_KEY",  // AIzaSyxxx
  model: "google/gemini-2.0-flash",
}
\`\`\`

3. Guarda el archivo

---

## Paso 3: Crear Proyecto en Jira

### 3.1 Crear el Proyecto

1. Ve a: https://www.atlassian.com/software/jira/free
2. Inicia sesión (o crea cuenta)
3. Haz clic en "Crear proyecto"
4. Selecciona: "Kanban" (no Scrum)
5. Nombre: "Blueprints"
6. Clave del proyecto: `BP` (IMPORTANTE: será parte de los IDs, ej: BP-1, BP-2)
7. Acceso: "Abierto"
8. Crea el proyecto

### 3.2 Verificar el Tablero

Tu tablero debe tener 3 columnas:
- **POR HACER** (To Do)
- **EN CURSO** (In Progress)
- **FINALIZADO** (Done)

Si no las tiene, ve a: Project Settings → Board → Columns

---

## Paso 4: Crear Tareas en Jira

### Tarea 1: Blueprint Stripe Payment (FÁCIL)

1. En Jira, haz clic en "Crear" (botón azul)
2. Completa:

\`\`\`
Tipo: Story
Proyecto: Blueprints (BP)
Resumen: "Blueprint para pagos con Stripe"

Descripción:
Necesitamos un blueprint para procesar pagos usando Stripe.

Especificaciones:
- Formulario con datos de tarjeta
- Validación de campos bancarios
- Integración con Stripe API
- Manejo de errores y respuestas
- Confirmación de pago

Recursos:
- Stripe tiene API gratuita para pruebas
- Campos: cardNumber, cvv, expiryDate, amount, currency

Prioridad: Alta
\`\`\`

3. Crea la tarea
4. En la columna "POR HACER", arrastra la tarea a "EN CURSO"

### Tarea 2: Blueprint Google Maps (FÁCIL)

1. Haz clic en "Crear"
2. Completa:

\`\`\`
Tipo: Story
Proyecto: Blueprints (BP)
Resumen: "Blueprint para geolocalización con Google Maps"

Descripción:
Crear un blueprint que integre Google Maps Geocoding API.

Especificaciones:
- Campo para buscar direcciones
- Mapa interactivo
- Guardar coordenadas (lat, lng)
- Validación de direcciones válidas
- Autocompletado de lugares

Recursos:
- Google Maps API (disponible y fácil de integrar)
- Campos: address, latitude, longitude, placeId

Prioridad: Alta
\`\`\`

3. Mueve a "EN CURSO"

### Tarea 3: Blueprint OpenWeather (MEDIO)

1. Haz clic en "Crear"
2. Completa:

\`\`\`
Tipo: Story
Proyecto: Blueprints (BP)
Resumen: "Blueprint para datos de clima en tiempo real"

Descripción:
Integrar OpenWeatherMap API para obtener datos de clima.

Especificaciones:
- Campo para ciudad/código postal
- Mostrar: temperatura, humedad, viento
- Icono del clima dinámico
- Búsqueda predictiva de ciudades
- Cache de resultados

Recursos:
- OpenWeatherMap (API gratuita)
- Campos: city, temperature, humidity, windSpeed, description

Prioridad: Media
\`\`\`

3. Mueve a "EN CURSO"

### Tarea 4: Blueprint SendGrid Email (DIFÍCIL - NO IMPLEMENTABLE)

1. Haz clic en "Crear"
2. Completa:

\`\`\`
Tipo: Story
Proyecto: Blueprints (BP)
Resumen: "Blueprint para envío de emails con SendGrid"

Descripción:
Crear blueprint para validar y enviar emails usando SendGrid.

Especificaciones:
- Campo para email del remitente
- Campo para email del destinatario
- Asunto del email
- Cuerpo del mensaje (editor rich text)
- CC y BCC
- Validación de emails
- Manejo de errores de envío

Recursos:
- SendGrid requiere: API Key configurada en backend
- Necesita servidor backend para autenticación segura
- Campos: to, from, subject, body, cc, bcc

Prioridad: Media
\`\`\`

3. DÉJALO en "POR HACER" (el agente lo asignará a alguien)

---

## Paso 5: Ejecutar el Agente Localmente

### 5.1 Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 5.2 Ejecutar servidor de desarrollo

\`\`\`bash
npm run dev
\`\`\`

### 5.3 Acceder al agente

1. Abre: http://localhost:3000/agent
2. Deberías ver un botón "Ejecutar Agente"
3. Haz clic para iniciar

---

## Paso 6: Monitorear la Ejecución

El agente hará esto:

1. **Leerá** todas las tareas en "EN CURSO"
2. **Analizará** cada tarea con Gemini
3. **Si es implementable:**
   - Crea una rama: `feature/blueprint-{nombre}`
   - Genera el código del blueprint
   - Crea un archivo TypeScript
   - Hace un Pull Request
   - Comenta en Jira con el link al PR

4. **Si NO es implementable:**
   - Busca un desarrollador apropiado
   - Te lo asigna
   - Comenta explicando por qué no es posible

---

## Troubleshooting

### Error: "Failed to fetch"
- Verifica que todos los tokens en `config/local.ts` estén correctos
- Los tokens no pueden tener espacios

### Error: "Jira error: ..."
- Verifica que el dominio de Jira sea correcto
- Verifica que el email y API token sean válidos
- Intenta crear una tarea manual en Jira para confirmar acceso

### Error: "GitHub authentication failed"
- Verifica que el GitHub token sea válido
- Los tokens con "ghp_" prefix son correctos

### El agente no ve las tareas
- Verifica que las tareas estén en la columna "EN CURSO"
- Verifica que el projectKey sea correcto (debe ser "BP")

---

## Comandos Útiles

\`\`\`bash
# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Lintear código
npm run lint
\`\`\`

¡Listo! Ahora puedes ejecutar tu agente inteligente localmente.
