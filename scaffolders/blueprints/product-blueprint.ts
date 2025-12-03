import type { BlueprintSchema } from "@/scaffolders/types"

export const ProductBlueprint: BlueprintSchema = {
  name: "Nuevo Producto",
  description: "Añade un producto al catálogo",
  apiEndpoint: "https://jsonplaceholder.typicode.com/posts",
  fields: [
    {
      name: "productName",
      type: "text",
      label: "Nombre del Producto",
      placeholder: "ej: Laptop ProBook",
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    {
      name: "description",
      type: "textarea",
      label: "Descripción",
      placeholder: "Describe las características del producto...",
      required: true,
      minLength: 10,
    },
    {
      name: "sku",
      type: "text",
      label: "SKU (Código)",
      placeholder: "PB-2024-001",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Precio (€)",
      placeholder: "99.99",
      required: true,
      min: 0,
    },
    {
      name: "stock",
      type: "number",
      label: "Cantidad en Stock",
      placeholder: "50",
      required: true,
      min: 0,
    },
    {
      name: "category",
      type: "select",
      label: "Categoría",
      required: true,
      options: [
        { label: "Electrónica", value: "electronics" },
        { label: "Ropa", value: "clothing" },
        { label: "Alimentos", value: "food" },
        { label: "Hogar", value: "home" },
        { label: "Otros", value: "other" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Marcar como producto destacado",
      required: false,
    },
    {
      name: "discount",
      type: "number",
      label: "Descuento (%)",
      placeholder: "0",
      required: false,
      min: 0,
      max: 100,
    },
  ],
  onSubmit: async (data) => {
    console.log("Producto añadido:", data)
  },
}
