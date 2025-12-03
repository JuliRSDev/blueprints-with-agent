# Ejemplos de Tareas JSON para Jira

Si quieres crear las tareas programáticamente, puedes usar la API de Jira.

## Crear una Tarea vía API de Jira

\`\`\`bash
curl -X POST \
  -H "Authorization: Basic $(echo -n 'tu-email@example.com:TU_API_TOKEN' | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": { "key": "BP" },
      "issuetype": { "name": "Story" },
      "summary": "Blueprint para integración de pagos con Stripe",
      "description": "La aplicación necesita un blueprint para Stripe..."
    }
  }' \
  https://tu-empresa.atlassian.net/rest/api/3/issues
\`\`\`

## 4 Ejemplos de Tareas JSON

### Tarea 1: Stripe Payment Blueprint

\`\`\`json
{
  "fields": {
    "project": { "key": "BP" },
    "issuetype": { "name": "Story" },
    "summary": "Blueprint para integración de pagos con Stripe",
    "description": "La aplicación necesita un blueprint para manejar pagos usando Stripe.\n\nDebe incluir:\n- Formulario para datos de pago\n- Validación de tarjeta\n- Integración con Stripe API\n- Manejo de errores\n\nCampos: cardNumber, cardholderName, expiryMonth, expiryYear, cvv, amount, currency",
    "priority": { "name": "High" }
  }
}
\`\`\`

### Tarea 2: Google Maps Blueprint

\`\`\`json
{
  "fields": {
    "project": { "key": "BP" },
    "issuetype": { "name": "Story" },
    "summary": "Blueprint para geolocalización con Google Maps API",
    "description": "Crear blueprint para captar ubicación usando Google Maps.\n\nCaracterísticas:\n- Mapa interactivo\n- Búsqueda de direcciones\n- Guardado de coordenadas\n- Autocompletado\n\nCampos: address, latitude, longitude, placeId, country, city",
    "priority": { "name": "High" }
  }
}
\`\`\`

### Tarea 3: OpenWeatherMap Blueprint

\`\`\`json
{
  "fields": {
    "project": { "key": "BP" },
    "issuetype": { "name": "Story" },
    "summary": "Blueprint para datos de clima en tiempo real",
    "description": "Crear blueprint que consuma datos de clima usando OpenWeatherMap.\n\nCaracterísticas:\n- Búsqueda de ciudad\n- Temperatura, humedad, viento\n- Icono del clima\n- Búsqueda predictiva\n\nCampos: city, temperature, humidity, windSpeed, weatherDescription, weatherIcon",
    "priority": { "name": "Medium" }
  }
}
\`\`\`

### Tarea 4: SendGrid Email Blueprint

\`\`\`json
{
  "fields": {
    "project": { "key": "BP" },
    "issuetype": { "name": "Story" },
    "summary": "Blueprint para envío de email con SendGrid",
    "description": "Crear blueprint para validar y enviar emails usando SendGrid.\n\nRequerimientos:\n- Campo para email remitente\n- Campo para email destinatario\n- Asunto del email\n- Cuerpo del mensaje\n- Validación de emails\n- Manejo de errores\n\nCampos: to, from, subject, body, cc, bcc",
    "priority": { "name": "Medium" }
  }
}
\`\`\`

## Script para crear todas las tareas

Guarda esto en un archivo `create-tasks.sh`:

\`\`\`bash
#!/bin/bash

JIRA_DOMAIN="tu-empresa.atlassian.net"
JIRA_EMAIL="tu-email@example.com"
JIRA_TOKEN="TU_API_TOKEN"
AUTH=$(echo -n "$JIRA_EMAIL:$JIRA_TOKEN" | base64)

# Tarea 1
curl -X POST \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": { "key": "BP" },
      "issuetype": { "name": "Story" },
      "summary": "Blueprint para integración de pagos con Stripe",
      "description": "La aplicación necesita un blueprint para manejar pagos usando Stripe.\n\nDebe incluir:\n- Formulario para datos de pago\n- Validación de tarjeta\n- Integración con Stripe API\n\nCampos: cardNumber, cardholderName, expiryMonth, expiryYear, cvv, amount, currency"
    }
  }' \
  https://$JIRA_DOMAIN/rest/api/3/issues

# Tarea 2
curl -X POST \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": { "key": "BP" },
      "issuetype": { "name": "Story" },
      "summary": "Blueprint para geolocalización con Google Maps",
      "description": "Crear blueprint para captar ubicación usando Google Maps.\n\nCaracterísticas:\n- Mapa interactivo\n- Búsqueda de direcciones\n- Guardado de coordenadas\n\nCampos: address, latitude, longitude, placeId"
    }
  }' \
  https://$JIRA_DOMAIN/rest/api/3/issues

# Tarea 3
curl -X POST \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": { "key": "BP" },
      "issuetype": { "name": "Story" },
      "summary": "Blueprint para datos de clima en tiempo real",
      "description": "Crear blueprint que consuma datos de clima usando OpenWeatherMap.\n\nCaracterísticas:\n- Búsqueda de ciudad\n- Temperatura, humedad, viento\n- Icono del clima\n\nCampos: city, temperature, humidity, windSpeed"
    }
  }' \
  https://$JIRA_DOMAIN/rest/api/3/issues

# Tarea 4
curl -X POST \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": { "key": "BP" },
      "issuetype": { "name": "Story" },
      "summary": "Blueprint para envío de email con SendGrid",
      "description": "Crear blueprint para envío de emails usando SendGrid.\n\nRequerimientos:\n- Validación de emails\n- Asunto y cuerpo\n- CC y BCC\n\nCampos: to, from, subject, body, cc, bcc"
    }
  }' \
  https://$JIRA_DOMAIN/rest/api/3/issues

echo "Tareas creadas exitosamente"
\`\`\`

Ejecuta:
\`\`\`bash
chmod +x create-tasks.sh
./create-tasks.sh
