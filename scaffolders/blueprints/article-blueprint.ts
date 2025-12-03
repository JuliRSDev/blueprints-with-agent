import type { BlueprintSchema } from "@/scaffolders/types"

export const ArticleBlueprint: BlueprintSchema = {
  name: "Nuevo Artículo",
  description: "Publica un artículo en el blog",
  apiEndpoint: "https://jsonplaceholder.typicode.com/posts",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título del Artículo",
      placeholder: "Mi primer artículo...",
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    {
      name: "author",
      type: "text",
      label: "Autor",
      placeholder: "Tu nombre",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      label: "Contenido",
      placeholder: "Escribe tu artículo aquí...",
      required: true,
      minLength: 50,
    },
    {
      name: "tags",
      type: "text",
      label: "Etiquetas (separadas por comas)",
      placeholder: "tecnología, desarrollo, web",
      required: false,
    },
    {
      name: "category",
      type: "select",
      label: "Categoría",
      required: true,
      options: [
        { label: "Tecnología", value: "tech" },
        { label: "Negocios", value: "business" },
        { label: "Diseño", value: "design" },
        { label: "Tutoriales", value: "tutorials" },
        { label: "Noticias", value: "news" },
      ],
    },
    {
      name: "status",
      type: "radio",
      label: "Estado de Publicación",
      required: true,
      options: [
        { label: "Borrador", value: "draft" },
        { label: "Programado", value: "scheduled" },
        { label: "Publicado", value: "published" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Artículo destacado",
      required: false,
    },
    {
      name: "comments",
      type: "checkbox",
      label: "Permitir comentarios",
      required: false,
    },
  ],
  onSubmit: async (data) => {
    console.log("Artículo publicado:", data)
  },
}
