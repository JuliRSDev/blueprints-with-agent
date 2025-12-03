# CHECKLIST: Configuración Completa

Usa este checklist para verificar que todo está listo.

## Paso 1: Obtener Tokens

- [ ] GitHub Personal Access Token obtenido
  - Desde: https://github.com/settings/tokens/new
  - Permisos: repo, workflow
  - Token: ghp_xxxx...

- [ ] Jira API Token obtenido
  - Desde: https://id.atlassian.com/manage-profile/security/api-tokens
  - Token: ATATT3xxx...
  - Email: tu-email@example.com
  - Dominio: tu-empresa.atlassian.net

- [ ] Google Gemini API Key obtenido
  - Desde: https://aistudio.google.com/app/apikeys
  - Key: AIzaSyxxx...

## Paso 2: Configurar Localmente

- [ ] Archivo \`config/local.ts\` creado
- [ ] GitHub token pegado en GITHUB_CONFIG
- [ ] Jira token pegado en JIRA_CONFIG
- [ ] Gemini API Key pegado en GEMINI_CONFIG
- [ ] Todos los campos llenan (sin valores de ejemplo)

## Paso 3: Configurar Jira

- [ ] Proyecto "Blueprints" creado
- [ ] Clave del proyecto: BP
- [ ] Tablero Kanban con 3 columnas:
  - [ ] POR HACER
  - [ ] EN CURSO
  - [ ] FINALIZADO

- [ ] Al menos 3 tareas creadas
- [ ] Al menos 3 tareas movidas a "EN CURSO"

### Tareas de Ejemplo (Copia desde GUIA_JIRA_COMPLETA.md)
- [ ] Tarea 1: Blueprint Stripe (IMPLEMENTABLE)
- [ ] Tarea 2: Blueprint Google Maps (IMPLEMENTABLE)
- [ ] Tarea 3: Blueprint OpenWeather (IMPLEMENTABLE)
- [ ] Tarea 4: Blueprint SendGrid (NO IMPLEMENTABLE - para probar asignación)

## Paso 4: Instalar y Ejecutar

- [ ] \`npm install\` completado sin errores
- [ ] \`npm run dev\` ejecutándose
- [ ] Acceso a http://localhost:3000 exitoso
- [ ] Acceso a http://localhost:3000/agent exitoso

## Paso 5: Verificar Configuración en la UI

- [ ] Abre http://localhost:3000/agent
- [ ] Verifica que veas: "✓ Configuración válida"
- [ ] Si no, revisar errores y corregir config/local.ts

## Paso 6: Ejecutar Agente

- [ ] Haz clic en "Ejecutar Agente"
- [ ] Espera a que procese
- [ ] Verifica resultados:
  - [ ] Tareas implementables: ✅ Completado
  - [ ] Tareas no implementables: ✅ Asignado

## Paso 7: Revisar Resultados

### En GitHub
- [ ] Nueva rama creada: feature/blueprint-xxxx
- [ ] Nuevo PR abierto
- [ ] Código generado en \`scaffolders/blueprints/\`

### En Jira
- [ ] Comentarios agregados a las tareas
- [ ] Tareas asignadas a desarrolladores

---

## ¿Completaste todo?

¡Felicidades! Tu agente está funcionando correctamente.

Próximos pasos:
1. Revisar PRs en GitHub
2. Mergear PRs correctos
3. Crear más tareas en Jira
4. Ejecutar el agente nuevamente

---

## Solución de Problemas

Si algo no funciona, revisa:
1. \`GUIA_CONFIGURACION_LOCAL.md\` - Pasos detallados
2. \`GUIA_EJECUCION_AGENTE.md\` - Errores comunes
3. \`GUIA_JIRA_COMPLETA.md\` - Cómo crear tareas

## Soporte

Si después de leer todo sigue sin funcionar:
- Verifica que los tokens sean válidos
- Verifica que GitHub, Jira y Gemini tengan acceso
- Lee los logs en la consola del navegador (F12)
- Revisa los logs en la terminal donde ejecutas npm run dev
