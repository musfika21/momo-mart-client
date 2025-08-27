import { getSession } from "next-auth/react"

export async function makeAuthenticatedRequest(urlg, options = {}) {
  const session = await getSession()
  
  if (!session || !(session).backendToken) {
    throw new Error('No authentication token available')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${(session).backendToken}`,
    ...options.headers,
  }

  const response = await fetch(urlg, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}