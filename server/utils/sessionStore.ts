type SessionRecord = {
  email: string
  lastActive: number
}

const FIVE_MINUTES_MS = 5 * 60 * 1000

const sessions = new Map<string, SessionRecord>()

export function createSession(sessionId: string, email: string): void {
  sessions.set(sessionId, { email, lastActive: Date.now() })
}

export function getSession(sessionId: string | undefined | null): SessionRecord | null {
  if (!sessionId) return null
  const record = sessions.get(sessionId)
  return record ?? null
}

export function touchSession(sessionId: string): void {
  const record = sessions.get(sessionId)
  if (!record) return
  record.lastActive = Date.now()
  sessions.set(sessionId, record)
}

export function destroySession(sessionId: string | undefined | null): void {
  if (!sessionId) return
  sessions.delete(sessionId)
}

export function isSessionExpired(record: SessionRecord): boolean {
  return Date.now() - record.lastActive > FIVE_MINUTES_MS
}

export const SESSION_COOKIE_NAME = 'admin_session'
export const SESSION_MAX_AGE_SECONDS = 300
export const SESSION_MAX_AGE_MS = FIVE_MINUTES_MS


