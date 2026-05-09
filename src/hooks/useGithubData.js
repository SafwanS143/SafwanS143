import { useEffect, useState } from 'react'
import { GITHUB_USERNAME, projects } from '../data/projects'

const CACHE_KEY = 'gh-pinned-cache-v1'
const CACHE_TTL = 1000 * 60 * 30 // 30 min

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))
  } catch {
    /* ignore quota errors */
  }
}

export function useGithubData() {
  const [data, setData] = useState(() => readCache() ?? {})
  const [loading, setLoading] = useState(() => !readCache())
  const [error, setError] = useState(null)

  useEffect(() => {
    const cached = readCache()
    if (cached) return

    let cancelled = false

    async function fetchAll() {
      try {
        const results = await Promise.all(
          projects.map((p) =>
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${p.repo}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null),
          ),
        )

        if (cancelled) return

        const next = {}
        results.forEach((repo, i) => {
          if (!repo) return
          next[projects[i].repo] = {
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            updatedAt: repo.updated_at,
            language: repo.language,
            html_url: repo.html_url,
            description: repo.description,
          }
        })

        setData(next)
        writeCache(next)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAll()
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
