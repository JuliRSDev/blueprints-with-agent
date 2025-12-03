# Ejemplos JSON para crear tareas en Jira (API)

Si prefieres crear las tareas automáticamente mediante API, puedes usar estos ejemplos:

## Ejemplo 1: Crear Tarea (cURL)

\`\`\`bash
curl --request POST \
  --url 'https://tu-dominio.atlassian.net/rest/api/3/issues' \
  --user 'tu-email@ejemplo.com:TU_API_TOKEN' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "fields": {
      "project": {
        "key": "BP"
      },
      "summary": "Blueprint para integración de pagos con Stripe",
      "description": {
        "version": 1,
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "La aplicación necesita un blueprint para manejar pagos usando Stripe.\n\nRequisitos:\n- Formulario para datos de pago\n- Validación de datos bancarios\n- Integración con API de Stripe\n- Manejo de errores"
              }
            ]
          }
        ]
      },
      "issuetype": {
        "name": "Story"
      },
      "priority": {
        "name": "High"
      },
      "status": {
        "name": "In Progress"
      }
    }
  }'
\`\`\`

## Ejemplo 2: JSON para Crear Multiple Tareas

\`\`\`json
{
  "issues": [
    {
      "fields": {
        "project": { "key": "BP" },
        "summary": "Blueprint para Pagos con Stripe",
        "issuetype": { "name": "Story" },
        "priority": { "name": "High" },
        "status": { "name": "In Progress" }
      }
    },
    {
      "fields": {
        "project": { "key": "BP" },
        "summary": "Blueprint para Geolocalización con Google Maps",
        "issuetype": { "name": "Story" },
        "priority": { "name": "High" },
        "status": { "name": "In Progress" }
      }
    },
    {
      "fields": {
        "project": { "key": "BP" },
        "summary": "Blueprint para Clima con OpenWeatherMap",
        "issuetype": { "name": "Story" },
        "priority": { "name": "Medium" },
        "status": { "name": "In Progress" }
      }
    }
  ]
}
\`\`\`

## Ejemplo 3: Listar todas tus tareas (cURL)

\`\`\`bash
curl --request GET \
  --url 'https://tu-dominio.atlassian.net/rest/api/3/search?jql=project=BP' \
  --user 'tu-email@ejemplo.com:TU_API_TOKEN' \
  --header 'Accept: application/json'
\`\`\`

Respuesta:
\`\`\`json
{
  "issues": [
    {
      "key": "BP-1",
      "fields": {
        "summary": "Blueprint para Pagos con Stripe",
        "status": { "name": "In Progress" }
      }
    }
  ]
}
\`\`\`

## Ejemplo 4: Asignar Tarea a un Usuario

\`\`\`bash
curl --request PUT \
  --url 'https://tu-dominio.atlassian.net/rest/api/3/issues/BP-1/assignee' \
  --user 'tu-email@ejemplo.com:TU_API_TOKEN' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "accountId": "5f12a34c5d1234567890"
  }'
\`\`\`

## Ejemplo 5: Cambiar Estado de Tarea

\`\`\`bash
curl --request POST \
  --url 'https://tu-dominio.atlassian.net/rest/api/3/issues/BP-1/transitions' \
  --user 'tu-email@ejemplo.com:TU_API_TOKEN' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "transition": {
      "id": "11"
    }
  }'
\`\`\`

**Nota:** El ID de transición varía. Para obtenerlo:

\`\`\`bash
curl --request GET \
  --url 'https://tu-dominio.atlassian.net/rest/api/3/issues/BP-1/transitions' \
  --user 'tu-email@ejemplo.com:TU_API_TOKEN' \
  --header 'Accept: application/json'
