import type { BlueprintSchema } from "@/scaffolders/types"

export const UserBlueprint: BlueprintSchema = {
  name: "Nuevo Usuario",
  description: "Crea un nuevo usuario en el sistema",
  apiEndpoint: "https://jsonplaceholder.typicode.com/users",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre Completo",
      placeholder: "Juan Pérez",
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "juan@example.com",
      required: true,
    },
    {
      name: "phone",
      type: "tel",
      label: "Teléfono",
      placeholder: "+34 123 456 789",
      required: true,
    },
    {
      name: "username",
      type: "text",
      label: "Nombre de Usuario",
      placeholder: "juan_perez",
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    {
      name: "company",
      type: "text",
      label: "Empresa",
      placeholder: "Mi Empresa S.L.",
      required: false,
    },
    {
      name: "status",
      type: "select",
      label: "Estado",
      required: true,
      options: [
        { label: "Activo", value: "active" },
        { label: "Inactivo", value: "inactive" },
        { label: "Pendiente", value: "pending" },
      ],
    },
  ],
  onSubmit: async (data) => {
    console.log("Usuario creado:", data)
  },
}
