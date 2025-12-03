export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "tel"

export interface FieldConfig {
  name: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  validation?: (value: any) => string | null
  options?: { label: string; value: string }[]
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  apiEndpoint?: string
  apiTransform?: (data: any) => any
  defaultValue?: any
}

export interface BlueprintSchema {
  name: string
  description: string
  fields: FieldConfig[]
  onSubmit: (data: any) => Promise<void> | void
  apiEndpoint?: string
}
