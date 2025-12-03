"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserBlueprint } from "@/scaffolders/blueprints/user-blueprint"
import { AdminBlueprint } from "@/scaffolders/blueprints/admin-blueprint"
import { ProductBlueprint } from "@/scaffolders/blueprints/product-blueprint"
import { ArticleBlueprint } from "@/scaffolders/blueprints/article-blueprint"
import { FormBuilder } from "@/scaffolders/components/form-builder"
import { Users, Lock, Package, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

const blueprints = [
  {
    id: "user",
    name: "Crear Usuario",
    description: "Formulario para crear nuevos usuarios",
    icon: Users,
    blueprint: UserBlueprint,
  },
  {
    id: "admin",
    name: "Crear Administrador",
    description: "Formulario para crear administradores con permisos avanzados",
    icon: Lock,
    blueprint: AdminBlueprint,
  },
  {
    id: "product",
    name: "Crear Producto",
    description: "Formulario para añadir productos al catálogo",
    icon: Package,
    blueprint: ProductBlueprint,
  },
  {
    id: "article",
    name: "Crear Artículo",
    description: "Formulario para publicar nuevos artículos de blog",
    icon: BookOpen,
    blueprint: ArticleBlueprint,
  },
]

export default function Home() {
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<any[]>([])

  const activeBlueprint = blueprints.find((b) => b.id === selectedBlueprint)
  const BlueprintComponent = activeBlueprint?.blueprint

  const handleSubmit = (data: any) => {
    setSubmissions([...submissions, { blueprint: selectedBlueprint, data, timestamp: new Date() }])
    alert("¡Datos enviados exitosamente!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Blueprints Scaffolder</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Sistema modular de formularios dinámicos con APIs públicas integradas
            </p>
          </div>
          <Link href="/agent">
            <Button className="gap-2" size="lg">
              <Zap className="w-5 h-5" />
              Ir al Agente
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blueprint Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Blueprints Disponibles</h2>
              {blueprints.map((blueprint) => {
                const Icon = blueprint.icon
                return (
                  <Button
                    key={blueprint.id}
                    variant={selectedBlueprint === blueprint.id ? "default" : "outline"}
                    className="w-full justify-start gap-3 h-auto py-4"
                    onClick={() => setSelectedBlueprint(blueprint.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{blueprint.name}</div>
                      <div className="text-xs opacity-75">{blueprint.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Form Display */}
          <div className="lg:col-span-2">
            {selectedBlueprint && BlueprintComponent ? (
              <Card className="border-2 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle>{activeBlueprint?.name}</CardTitle>
                  <CardDescription>{activeBlueprint?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormBuilder blueprint={BlueprintComponent} onSubmit={handleSubmit} />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="text-slate-500 dark:text-slate-400">
                    <p className="text-lg font-semibold mb-2">Selecciona un blueprint</p>
                    <p>Elige uno de los blueprints disponibles para empezar a usar el formulario</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submissions Preview */}
            {submissions.length > 0 && (
              <Card className="mt-8 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg">Últimos Envíos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {submissions.slice(-3).map((submission, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {blueprints.find((b) => b.id === submission.blueprint)?.name}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {submission.timestamp.toLocaleString("es-ES")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
