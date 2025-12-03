import { Octokit } from "@octokit/rest"
import { GITHUB_CONFIG } from "@/config/local"

const octokit = new Octokit({
  auth: GITHUB_CONFIG.token,
})

export async function getRepositoryStructure() {
  try {
    const { data: contents } = await octokit.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: "scaffolders",
    })

    if (Array.isArray(contents)) {
      return contents.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type,
        url: item.html_url,
      }))
    }
    return []
  } catch (error) {
    console.error("[v0] Error getting repo structure:", error)
    throw error
  }
}

export async function getFileContent(path: string) {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path,
    })

    if ("content" in data) {
      const content = Buffer.from(data.content, "base64").toString("utf-8")
      return content
    }
    return null
  } catch (error) {
    console.error("[v0] Error getting file content:", error)
    throw error
  }
}

export async function createBranch(branchName: string, baseBranch = "main") {
  try {
    const { data: baseRef } = await octokit.git.getRef({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      ref: `heads/${baseBranch}`,
    })

    const { data: newRef } = await octokit.git.createRef({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      ref: `refs/heads/${branchName}`,
      sha: baseRef.object.sha,
    })

    return newRef
  } catch (error) {
    console.error("[v0] Error creating branch:", error)
    throw error
  }
}

export async function createFile(path: string, content: string, branch: string, message: string) {
  try {
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path,
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
    })

    return data
  } catch (error) {
    console.error("[v0] Error creating file:", error)
    throw error
  }
}

export async function createPullRequest(title: string, body: string, head: string, base = "main") {
  try {
    const { data } = await octokit.pulls.create({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      title,
      body,
      head,
      base,
    })

    return data
  } catch (error) {
    console.error("[v0] Error creating PR:", error)
    throw error
  }
}

export async function getRepositoryInfo() {
  try {
    const { data } = await octokit.repos.get({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
    })

    return {
      name: data.name,
      description: data.description,
      url: data.html_url,
      language: data.language,
      stars: data.stargazers_count,
    }
  } catch (error) {
    console.error("[v0] Error getting repo info:", error)
    throw error
  }
}
