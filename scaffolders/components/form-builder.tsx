"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import type { BlueprintSchema } from "@/scaffolders/types"

interface FormBuilderProps {
  blueprint: BlueprintSchema
  onSubmit: (data: any) => void
}

export function FormBuilder({ blueprint, onSubmit }: FormBuilderProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onBlur" })

  const [isLoading, setIsLoading] = useState(false)
  const [apiData, setApiData] = useState<any>(null)

  const onFormSubmit = async (data: any) => {
    try {
      setIsLoading(true)

      // Fetch from API endpoint if specified
      if (blueprint.apiEndpoint) {
        const response = await fetch(blueprint.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        const result = await response.json()
        setApiData(result)
      }

      // Call blueprint's onSubmit
      await blueprint.onSubmit(data)

      // Call parent's onSubmit
      onSubmit(data)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {blueprint.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-base font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white min-h-32"
              {...register(field.name, {
                required: field.required ? `${field.label} es requerido` : false,
                minLength: field.minLength
                  ? { value: field.minLength, message: `Mínimo ${field.minLength} caracteres` }
                  : undefined,
                maxLength: field.maxLength
                  ? { value: field.maxLength, message: `Máximo ${field.maxLength} caracteres` }
                  : undefined,
              })}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              {...register(field.name, {
                required: field.required ? `${field.label} es requerido` : false,
              })}
            >
              <option value="">Selecciona una opción</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <div className="flex items-center gap-3">
              <input
                id={field.name}
                type="checkbox"
                className="w-5 h-5 rounded border-slate-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                {...register(field.name)}
              />
              <label htmlFor={field.name} className="cursor-pointer text-slate-700 dark:text-slate-300">
                {field.label}
              </label>
            </div>
          ) : field.type === "radio" ? (
            <div className="space-y-2">
              {field.options?.map((opt) => (
                <div key={opt.value} className="flex items-center gap-3">
                  <input
                    id={`${field.name}-${opt.value}`}
                    type="radio"
                    value={opt.value}
                    className="w-4 h-4 cursor-pointer"
                    {...register(field.name, {
                      required: field.required ? `${field.label} es requerido` : false,
                    })}
                  />
                  <label
                    htmlFor={`${field.name}-${opt.value}`}
                    className="cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              className="px-4 py-2"
              {...register(field.name, {
                required: field.required ? `${field.label} es requerido` : false,
                pattern:
                  field.type === "email"
                    ? {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email inválido",
                      }
                    : undefined,
                minLength: field.minLength
                  ? { value: field.minLength, message: `Mínimo ${field.minLength} caracteres` }
                  : undefined,
                maxLength: field.maxLength
                  ? { value: field.maxLength, message: `Máximo ${field.maxLength} caracteres` }
                  : undefined,
                min: field.min !== undefined ? { value: field.min, message: `Mínimo ${field.min}` } : undefined,
                max: field.max !== undefined ? { value: field.max, message: `Máximo ${field.max}` } : undefined,
              })}
            />
          )}

          {errors[field.name] && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors[field.name]?.message as string}
            </div>
          )}
        </div>
      ))}

      <Button type="submit" disabled={isLoading} className="w-full py-6 text-base font-semibold">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Formulario"
        )}
      </Button>

      {apiData && (
        <Card className="mt-6 p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">Respuesta de API:</div>
          <pre className="text-xs overflow-auto max-h-40 text-green-800 dark:text-green-200">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        </Card>
      )}
    </form>
  )
}
