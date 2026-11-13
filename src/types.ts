export type LevelId = 'eight-nine' | 'ten' | 'six-seven'
export type Activity = { id: string; title: string; instruction: string; target: number; kind: 'collect' | 'compose' | 'compare' | 'order' }
export type Level = { id: LevelId; title: string; subtitle: string; color: string; icon: string; activities: Activity[] }
export type Progress = { completed: string[]; stars: number; score: number; attempts: number; errors: number; seconds: number; updatedAt: string }
export type Learner = { id: string; name: string; avatar: string; progress: Progress }
