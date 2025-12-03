import type { BlueprintSchema } from "@/scaffolders/types"

export const BlueprintparadatosdeclimaconOpenWeatherMapBlueprint: BlueprintSchema = {
  name: "BlueprintparadatosdeclimaconOpenWeatherMap",
  description: "Auto-generated blueprint for BlueprintparadatosdeclimaconOpenWeatherMap",
  apiEndpoint: "https://api.example.com/submit",
  fields: [
    {
      name: "cardNumber",
      type: "text",
      label: "CardNumber",
      placeholder: "Enter cardNumber",
      required: true,
    },
    {
      name: "cvv",
      type: "text",
      label: "Cvv",
      placeholder: "Enter cvv",
      required: true,
    },
    {
      name: "expiryDate",
      type: "text",
      label: "ExpiryDate",
      placeholder: "Enter expiryDate",
      required: true,
    },
    {
      name: "amount",
      type: "text",
      label: "Amount",
      placeholder: "Enter amount",
      required: true,
    },
    {
      name: "currency",
      type: "text",
      label: "Currency",
      placeholder: "Enter currency",
      required: true,
    },
  ],
  onSubmit: async (data) => {
    console.log("Form submitted:", data)
    return { success: true }
  },
}