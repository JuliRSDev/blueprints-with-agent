# GUÍA: Cómo Ejecutar el Agente Paso a Paso

## Requisitos Previos

- Completaste `GUIA_CONFIGURACION_LOCAL.md`
- Todos los tokens están en `config/local.ts`
- Tienes al menos 3 tareas en "EN CURSO" en Jira
- Node.js 16+ instalado

---

## Paso 1: Verificar Configuración

\`\`\`bash
# En la terminal, en la raíz del proyecto
cat config/local.ts
\`\`\`

Verifica que veas:
- `GITHUB_CONFIG.token` con valor real (no es "ghp_AQUI_...")
- `JIRA_CONFIG.apiToken` con valor real
- `GEMINI_CONFIG.apiKey` con valor real

Si alguno está vacío, edita `config/local.ts` antes de continuar.

---

## Paso 2: Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

Este comando instala todas las librerías necesarias:
- Octokit (GitHub)
- AI SDK (Gemini)
- Next.js
- etc.

Espera a que termine (1-2 minutos).

---

## Paso 3: Ejecutar Servidor Local

\`\`\`bash
npm run dev
\`\`\`

Deberías ver algo como:

\`\`\`
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 1234ms
\`\`\`

Deja esto ejecutándose.

---

## Paso 4: Acceder al Panel del Agente

En tu navegador, abre:

\`\`\`
http://localhost:3000/agent
\`\`\`

Deberías ver:
- Un título: "Panel del Agente Inteligente"
- Un botón azul: "Ejecutar Agente"
- Un área de logs vacía

---

## Paso 5: Ejecutar el Agente

1. Haz clic en el botón "Ejecutar Agente"
2. Verás logs en tiempo real:

\`\`\`
[INICIANDO] Validando configuración...
[SUCCESS] Configuración válida
[INICIANDO] Obteniendo tareas en EN CURSO de Jira...
[SUCCESS] Encontradas 3 tareas
[INICIANDO] Analizando tarea: BP-1...
[GEMINI] Analizando: "Blueprint Stripe Payment"
[RESULTADO] ✅ Es implementable
[GITHUB] Creando rama: feature/blueprint-stripe-payment
[GITHUB] Generando código...
[GITHUB] Creando PR: #1
[JIRA] Comentando en BP-1...
...
\`\`\`

---

## Paso 6: Interpretar los Resultados

### Resultado ✅ IMPLEMENTABLE

\`\`\`
Tarea: BP-1 - Blueprint Stripe Payment
Estado: ✅ IMPLEMENTABLE
Rama: feature/blueprint-stripe-payment
PR: https://github.com/JuliRSDev/blueprints-with-agent/pull/45
\`\`\`

**Qué pasó:**
1. El agente analizó la tarea
2. Determinó que es posible hacerla
3. Creó una rama en GitHub
4. Generó el código del blueprint
5. Hizo un Pull Request
6. Comentó en Jira con el link

**Próximo paso:** Revisar el PR, mergear si es correcto.

### Resultado ❌ NO IMPLEMENTABLE

\`\`\`
Tarea: BP-4 - Blueprint SendGrid Email
Estado: ❌ NO IMPLEMENTABLE
Razón: Requiere configuración backend y API Key de SendGrid
Asignado a: María Backend
\`\`\`

**Qué pasó:**
1. El agente analizó la tarea
2. Determinó que necesita preparación previa
3. Buscó un desarrollador backend
4. Asignó la tarea a María Backend
5. Comentó explicando por qué

**Próximo paso:** María Backend prepara lo necesario.

---

## Paso 7: Revisar en GitHub

1. Ve a tu repositorio: `https://github.com/JuliRSDev/blueprints-with-agent`
2. Verás una rama nueva: `feature/blueprint-stripe-payment`
3. Verás un PR abierto con el código generado
4. El código estará en: `scaffolders/blueprints/stripe-blueprint.ts`

---

## Paso 8: Revisar en Jira

1. Ve a tu proyecto Jira
2. Abre la tarea BP-1
3. En comentarios, verás algo como:

\`\`\`
Agente Inteligente
Blueprint Stripe Payment ha sido implementado.
PR: https://github.com/JuliRSDev/blueprints-with-agent/pull/45
Rama: feature/blueprint-stripe-payment
\`\`\`

---

## Paso 9: Mergear y Completar

Para las tareas implementables:

\`\`\`bash
# En terminal, en tu proyecto local
git fetch origin
git checkout feature/blueprint-stripe-payment
# Revisar el código
git checkout main
git merge feature/blueprint-stripe-payment
git push origin main
\`\`\`

Luego en Jira, mueve la tarea a "FINALIZADO".

---

## Errores Comunes y Soluciones

### Error 1: "Failed to fetch"
\`\`\`
Causa: Los tokens no son válidos
Solución: Verifica config/local.ts y revisa los tokens
\`\`\`

### Error 2: "Jira error: invalid project key"
\`\`\`
Causa: La clave del proyecto no es "BP"
Solución: Edita JIRA_CONFIG.projectKey en config/local.ts
\`\`\`

### Error 3: "GitHub authentication failed"
\`\`\`
Causa: El token de GitHub está mal
Solución: Genera uno nuevo en https://github.com/settings/tokens
\`\`\`

### Error 4: "No tasks found in 'In Progress'"
\`\`\`
Causa: No hay tareas en la columna EN CURSO
Solución: Crea tareas en Jira y muévelas a EN CURSO
\`\`\`

### Error 5: "Gemini API error"
\`\`\`
Causa: La API Key de Gemini está mal o sin cuota
Solución: Verifica en https://aistudio.google.com/app/apikeys
\`\`\`

---

## Monitorear Múltiples Ejecuciones

Puedes ejecutar el agente varias veces:

**Primera ejecución:**
- Lee 3 tareas en EN CURSO
- Implementa 2, asigna 1

**Segunda ejecución:**
- Lee nuevas tareas que moviste a EN CURSO
- Procesa las nuevas

**Cada ejecución es independiente y segura.**

---

## Ver Logs Detallados

Si algo falla, abre la consola del navegador:
1. Presiona F12
2. Ve a la pestaña "Console"
3. Verás logs más detallados

O revisa la terminal donde ejecutaste `npm run dev`.

---

## Próximos Pasos

1. Ejecutar el agente
2. Revisar los PRs en GitHub
3. Revisar los comentarios en Jira
4. Mergear PRs correctos
5. Marcar tareas como FINALIZADO
6. Agregar más tareas para que el agente procese

¡Listo! Tu agente está funcionando.
