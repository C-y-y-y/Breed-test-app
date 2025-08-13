import { BreedType } from './types'

export const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const getImageUrl = (
  type: BreedType,
  referenceImageId: string | undefined | null
): string[] => {
  if (!referenceImageId) return []
  return [
    `https://cdn2.the${type}api.com/images/${referenceImageId}.jpg`,
    `https://cdn2.the${type}api.com/images/${referenceImageId}.png`,
    `https://cdn2.the${type}api.com/images/${referenceImageId}.webp`
  ]
}
