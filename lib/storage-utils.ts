/**
 * Safe localStorage utilities with proper error handling
 * Prevents serialization errors and handles edge cases
 */

export function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === "undefined") return defaultValue

    const item = localStorage.getItem(key)
    if (!item) return defaultValue

    const parsed = JSON.parse(item)
    return parsed as T
  } catch (error) {
    console.error(`[v0] Error reading from localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function safeSetItem(key: string, value: any): boolean {
  try {
    if (typeof window === "undefined") return false

    // Validate that the value is serializable
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`[v0] Error writing to localStorage key "${key}":`, error)
    return false
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === "undefined") return false

    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`[v0] Error removing from localStorage key "${key}":`, error)
    return false
  }
}

export const getFromStorage = safeGetItem
export const saveToStorage = safeSetItem
