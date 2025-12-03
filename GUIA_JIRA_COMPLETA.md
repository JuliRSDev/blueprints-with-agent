# GUÍA COMPLETA: Jira para el Agente

## ¿Qué es Jira?

Jira es una plataforma de gestión de proyectos que permite:
- Crear y asignar tareas
- Organizar trabajo en tableros
- Colaboración en equipo
- Integración con desarrollo

---

## Estructura de Jira para este Agente

### Proyecto: "Blueprints"
- Clave: `BP`
- Tipo: Kanban

### Tablero Kanban (3 columnas)
- **POR HACER** (To Do)
- **EN CURSO** (In Progress)
- **FINALIZADO** (Done)

### Campos de cada Tarea
\`\`\`
ID único: BP-1, BP-2, BP-3...
Título: Breve descripción
Descripción: Detalles de qué hacer
Tipo: Story
Prioridad: Alta/Media/Baja
Asignado a: Nombre del desarrollador
Estado: En la columna correspondiente
\`\`\`

---

## Ciclo de Vida de una Tarea

### 1. Crear Tarea (Estado: POR HACER)
\`\`\`
Alguien crea una tarea en Jira
Ejemplo: "Blueprint para pagos"
Está en la columna POR HACER
\`\`\`

### 2. Mover a En Curso (Estado: EN CURSO)
\`\`\`
La tarea se asigna a alguien
Se mueve a la columna EN CURSO
El agente la leerá aquí
\`\`\`

### 3. Agente Analiza (El agente entra en acción)
\`\`\`
Si es implementable:
  - Crea rama en GitHub
  - Genera código
  - Hace PR
  - Comenta en Jira: "PR: #123"

Si NO es implementable:
  - Busca desarrollador
  - La asigna
  - Comenta: "Requiere preparación: ..."
\`\`\`

### 4. Finalizar (Estado: FINALIZADO)
\`\`\`
Cuando el trabajo esté hecho:
- Mueve a FINALIZADO
- El PR está merged
- La tarea está completa
\`\`\`

---

## Cómo Crear una Tarea Perfecta para el Agente

### Estructura Ideal

\`\`\`
RESUMEN (50 caracteres máximo):
"Blueprint para pagos con Stripe"

DESCRIPCIÓN (Se detallado aquí):
Necesitamos un blueprint para...

Especificaciones:
- Campo 1: tipo de dato
- Campo 2: tipo de dato
- Validaciones requeridas
- Integraciones necesarias

Recursos/APIs:
- API 1: ¿disponible?
- API 2: ¿disponible?

Dificultad estimada: Fácil/Media/Difícil
\`\`\`

### Ejemplo Completo

\`\`\`markdown
Resumen: Blueprint para autenticación con Auth0

Descripción:
Se requiere crear un blueprint para autenticación segura usando Auth0.

Especificaciones:
- Formulario de login (email + password)
- Validación de credenciales
- Manejo de tokens JWT
- Logout y sesión

Recursos:
- Auth0 API (disponible, cuenta sandbox gratuita)
- Campos: email, password, token, userId, profile

Prioridad: Alta
Asignar a: Cualquier desarrollador full-stack
\`\`\`

---

## Trabajar con Desarrolladores en Jira

### Agregar Desarrolladores

1. Ve a: Proyecto → Configuración → Equipo
2. Haz clic en "Invitar"
3. Ingresa emails:
   - developer1@company.com
   - developer2@company.com
   - developer3@company.com

### Asignar Tarea

1. Abre la tarea
2. Haz clic en "Asignar a"
3. Selecciona un desarrollador
4. Se notificará automáticamente

### Ver Asignaciones

En el tablero Kanban, verás el avatar del desarrollador en cada tarea asignada.

---

## Estados y Transiciones

\`\`\`
POR HACER
    ↓
    → (Se asigna a alguien y se mueve)
EN CURSO
    ↓
    → (El agente trabaja o asigna a otro)
FINALIZADO
    ↓
    → (Tarea completada)
\`\`\`

---

## Comentarios en Jira

El agente comentará automáticamente:

\`\`\`
✅ Implementable:
"He creado la rama 'feature/blueprint-stripe' y el PR #45"

❌ No implementable:
"Esta tarea requiere configuración backend. Asignado a María Backend."
\`\`\`

---

## API Jira - Endpoints que Usamos

### Obtener tareas por estado
\`\`\`
GET /rest/api/3/search?jql=project=BP AND status="In Progress"
\`\`\`

### Obtener detalles de una tarea
\`\`\`
GET /rest/api/3/issues/BP-1
\`\`\`

### Asignar tarea
\`\`\`
PUT /rest/api/3/issues/BP-1/assignee
Body: { accountId: "user123" }
\`\`\`

### Comentar en tarea
\`\`\`
POST /rest/api/3/issues/BP-1/comments
Body: { body: { content: [...] } }
\`\`\`

---

## Mejores Prácticas

1. **Descripción clara**: Explica QUÉ se necesita, no CÓMO hacerlo
2. **Campos específicos**: Lista exactamente qué campos debe tener el blueprint
3. **APIs documentadas**: Menciona si las APIs necesarias existen
4. **Prioridad realista**: Alta para urgentes, Media para normales
5. **Asignación al mover**: Cuando mueves a "EN CURSO", asigna a alguien
