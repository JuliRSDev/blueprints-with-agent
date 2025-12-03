import { JIRA_CONFIG } from "@/config/local"

interface JiraIssue {
  key: string
  fields: {
    summary: string
    description: string
    status: { name: string }
    assignee: { displayName: string; emailAddress: string } | null
    priority: { name: string }
    issuetype: { name: string }
  }
}

const jiraUrl = `https://${JIRA_CONFIG.domain}`
const authHeader = `Basic ${Buffer.from(`${JIRA_CONFIG.email}:${JIRA_CONFIG.apiToken}`).toString("base64")}`

async function jiraRequest(endpoint: string, method = "GET", body?: any) {
  const response = await fetch(`${jiraUrl}/rest/api/3${endpoint}`, {
    method,
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Jira error: ${error.errorMessages?.join(", ")}`)
  }

  return response.json()
}

export async function getIssuesByStatus(status: string) {
  try {
    const jql = `project = ${JIRA_CONFIG.projectKey} AND status = "${status}"`
    const data = await jiraRequest(`/search?jql=${encodeURIComponent(jql)}&maxResults=50`)

    return data.issues as JiraIssue[]
  } catch (error) {
    console.error("[v0] Error getting issues by status:", error)
    throw error
  }
}

export async function getIssueDetails(issueKey: string) {
  try {
    const data = await jiraRequest(`/issues/${issueKey}`)
    return data as JiraIssue
  } catch (error) {
    console.error("[v0] Error getting issue details:", error)
    throw error
  }
}

export async function getUsers() {
  try {
    const data = await jiraRequest(`/users/search?maxResults=50`)
    return data
  } catch (error) {
    console.error("[v0] Error getting users:", error)
    throw error
  }
}

export async function assignIssue(issueKey: string, accountId: string) {
  try {
    const data = await jiraRequest(`/issues/${issueKey}/assignee`, "PUT", {
      accountId,
    })
    return data
  } catch (error) {
    console.error("[v0] Error assigning issue:", error)
    throw error
  }
}

export async function addComment(issueKey: string, comment: string) {
  try {
    const data = await jiraRequest(`/issues/${issueKey}/comments`, "POST", {
      body: {
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: comment,
              },
            ],
          },
        ],
      },
    })
    return data
  } catch (error) {
    console.error("[v0] Error adding comment:", error)
    throw error
  }
}

export async function transitionIssue(issueKey: string, transitionId: string) {
  try {
    const data = await jiraRequest(`/issues/${issueKey}/transitions`, "POST", {
      transition: { id: transitionId },
    })
    return data
  } catch (error) {
    console.error("[v0] Error transitioning issue:", error)
    throw error
  }
}
