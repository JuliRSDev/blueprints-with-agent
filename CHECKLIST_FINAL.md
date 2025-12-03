# Checklist Final Antes de Ejecutar

Antes de presionar "Ejecutar Agente", verifica esto:

## Tokens y Configuración

- [ ] Editaste `config/local.ts` con tus valores reales
- [ ] GitHub token comienza con `ghp_`
- [ ] Jira API token comienza con `ATATT`
- [ ] Gemini API key comienza con `AIza`
- [ ] Email de Jira es válido
- [ ] Domain de Jira es `tu-empresa.atlassian.net` (sin https)
- [ ] Proyecto key es `BP`

## GitHub Setup

- [ ] Creaste un Personal Access Token en GitHub
- [ ] El token tiene permisos de `repo` y `workflow`
- [ ] Tu repositorio existe en GitHub
- [ ] La rama `main` existe en tu repositorio
- [ ] Pusheaste el código del agente a `main`

## Jira Setup

- [ ] Creaste un proyecto Kanban llamado "Blueprints"
- [ ] La clave del proyecto es `BP`
- [ ] Tienes 3 columnas: To Do, In Progress, Done
- [ ] Creaste AL MENOS 3 tareas en el proyecto
- [ ] Las tareas están en la columna "In Progress"
- [ ] Tienes acceso como administrador del proyecto

## Gemini Setup

- [ ] Obtuviste una API key de Gemini
- [ ] La API key está habilitada
- [ ] No tiene restricciones de dominio

## Ejecución Local

- [ ] Instalaste dependencias: `npm install`
- [ ] Corriste: `npm run dev`
- [ ] Accediste a: `http://localhost:3000/agent`
- [ ] Ves el mensaje verde "✓ Configuración válida"

## Después de Ejecutar

- [ ] El botón cambió a "Ejecutando..."
- [ ] Esperaste 30-60 segundos
- [ ] Ves los resultados en la página
- [ ] Revisaste Jira y ves comentarios del agente
- [ ] Revisaste GitHub y ves nuevas ramas y PRs

Si todo está marcado, ¡el agente está funcionando correctamente!
