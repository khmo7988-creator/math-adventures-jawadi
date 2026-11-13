import type { Progress } from '../types'
const KEY = 'jawadi-math-progress-v1'
export function loadProgress(): Record<string, Progress> {
 try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}
export function saveProgress(studentId: string, progress: Progress) {
 const all = loadProgress(); all[studentId] = progress; localStorage.setItem(KEY, JSON.stringify(all))
}
export function emptyProgress(): Progress {
 return {completed:[],stars:0,score:0,attempts:0,errors:0,seconds:0,updatedAt:new Date().toISOString()}
}
