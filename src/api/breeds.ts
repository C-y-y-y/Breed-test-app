import { BaseBreed, BreedType } from '@/types'
import { getImageUrl, shuffle } from '@/utils'

const DOG_API_URL = 'https://api.thedogapi.com/v1'
const CAT_API_URL = 'https://api.thecatapi.com/v1'

const formatBreeds = (items: BaseBreed[], type: BreedType) => (
  items.map(breed => ({
    id: `${type}-${breed.id}`,
    type: type,
    name: breed.name,
    temperament: breed.temperament,
    life_span: breed.life_span,
    imageUrl: getImageUrl(type, breed.reference_image_id)
  }))
)

export async function getBreeds(limit = 10, query?: string) {
  const dogs = query
    ? await fetch(`${DOG_API_URL}/breeds/search?q=${encodeURIComponent(query)}`).then(r => r.json())
    : await fetch(`${DOG_API_URL}/breeds?limit=${limit}`).then(r => r.json())

  const cats = query
    ? await fetch(`${CAT_API_URL}/breeds/search?q=${encodeURIComponent(query)}`).then(r => r.json())
    : await fetch(`${CAT_API_URL}/breeds?limit=${limit}`).then(r => r.json())

  const mergedbreeds = [
    ...formatBreeds(dogs, 'dog'),
    ...formatBreeds(cats, 'cat')
  ]
  return shuffle(mergedbreeds)
}

export async function getBreedById(prefixedId: string) {
  const [type, pureId] = prefixedId.split('-') as [BreedType, string]

  if (type !== 'dog' && type !== 'cat') {
    throw new Error('Invalid breed type prefix')
  }

  const API_URL = type === 'dog' ? DOG_API_URL : CAT_API_URL

  const response = await fetch(`${API_URL}/breeds/${pureId}`)
  if (!response.ok) throw new Error('Failed to fetch breed')

  const breed = await response.json()
  return { ...breed, type }
}

export async function getBreedImages(type: 'dog' | 'cat', breedId: string, limit = 4) {
  const response = await fetch(`https://api.the${type}api.com/v1/images/search?breed_ids=${breedId}&limit=${limit}`, {
    next: { revalidate: 60 * 60 }
  })
  if (!response.ok) throw new Error('Failed to fetch breed images')
  return response.json() as Promise<{id: string; url: string}[]>
}