"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AgentResult {
  issueKey: string
  taskName: string
  status: "completed" | "assigned" | "failed"
  details: {
    branchName?: string
    prUrl?: string
    assignedTo?: string
    reason?: string
    error?: string
  }
}

export default function AgentPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AgentResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [configValid, setConfigValid] = useState(true)
  const [configErrors, setConfigErrors] = useState<string[]>([])

  useEffect(() => {
    const validateConfig = async () => {
      try {
        const response = await fetch("/api/agent/validate-config", {
          method: "POST",
        })
        const data = await response.json()
        setConfigValid(data.valid)
        setConfigErrors(data.errors || [])
      } catch (err) {
        console.error("[v0] Error validating config:", err)
        setConfigValid(false)
        setConfigErrors(["No se pudo validar la configuración"])
      }
    }
    validateConfig()
  }, [])

  const runAgent = async () => {
    setLoading(true)
    setError(null)
    setResults([])

    try {
      const response = await fetch("/api/agent/run", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to run agent")
      }

      const data = await response.json()
      setResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Panel del Agente Inteligente</h1>
        <p className="text-gray-600">Agente que analiza tareas en Jira, genera blueprints o asigna a desarrolladores</p>
      </div>

      {!configValid && (
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            <strong>Configuración incompleta:</strong>
            <ul className="mt-2 ml-4 space-y-1 list-disc">
              {configErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
            <p className="mt-2">
              Por favor, edita <code className="bg-red-100 px-1">config/local.ts</code> con tus tokens.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {configValid && (
        <Alert className="mb-8 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            <strong>✓ Configuración válida</strong> - El agente está listo para ejecutarse
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <Button onClick={runAgent} disabled={loading || !configValid} size="lg">
          {loading ? "Ejecutando..." : "Ejecutar Agente"}
        </Button>
      </div>

      {error && (
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {results.map((result) => (
          <Card key={result.issueKey}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{result.taskName}</CardTitle>
                  <CardDescription>{result.issueKey}</CardDescription>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : result.status === "assigned"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.status === "completed" ? "Completado" : result.status === "assigned" ? "Asignado" : "Error"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.details.branchName && (
                  <p>
                    <strong>Rama:</strong> <code className="bg-gray-100 px-2 py-1">{result.details.branchName}</code>
                  </p>
                )}
                {result.details.prUrl && (
                  <p>
                    <strong>PR:</strong>{" "}
                    <a
                      href={result.details.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {result.details.prUrl}
                    </a>
                  </p>
                )}
                {result.details.assignedTo && (
                  <p>
                    <strong>Asignado a:</strong> {result.details.assignedTo}
                  </p>
                )}
                {result.details.reason && (
                  <p>
                    <strong>Razón:</strong> {result.details.reason}
                  </p>
                )}
                {result.details.error && (
                  <p className="text-red-600">
                    <strong>Error:</strong> {result.details.error}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {results.length === 0 && !loading && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            Presiona el botón para ejecutar el agente y ver los resultados
          </CardContent>
        </Card>
      )}
    </main>
  )
}
