import type { BlueprintSchema } from "@/scaffolders/types"

export const AdminBlueprint: BlueprintSchema = {
  name: "Nuevo Administrador",
  description: "Crea un nuevo administrador con permisos avanzados",
  fields: [
    {
      name: "fullName",
      type: "text",
      label: "Nombre Completo",
      placeholder: "Admin Name",
      required: true,
      minLength: 5,
    },
    {
      name: "adminEmail",
      type: "email",
      label: "Email Administrativo",
      placeholder: "admin@example.com",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Contraseña",
      placeholder: "Mínimo 8 caracteres",
      required: true,
      minLength: 8,
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirmar Contraseña",
      placeholder: "Repite tu contraseña",
      required: true,
    },
    {
      name: "department",
      type: "select",
      label: "Departamento",
      required: true,
      options: [
        { label: "Recursos Humanos", value: "rh" },
        { label: "Finanzas", value: "finance" },
        { label: "IT", value: "it" },
        { label: "Operaciones", value: "ops" },
      ],
    },
    {
      name: "permissions",
      type: "checkbox",
      label: "Gestionar usuarios",
      required: false,
    },
    {
      name: "twoFactor",
      type: "checkbox",
      label: "Habilitar autenticación de dos factores",
      required: false,
    },
    {
      name: "level",
      type: "radio",
      label: "Nivel de Administración",
      required: true,
      options: [
        { label: "Administrador General", value: "general" },
        { label: "Administrador Departamental", value: "department" },
        { label: "Administrador Limitado", value: "limited" },
      ],
    },
  ],
  onSubmit: async (data) => {
    console.log("Administrador creado:", data)
  },
}
