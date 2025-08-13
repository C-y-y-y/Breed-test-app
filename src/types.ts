export type BreedType = 'dog' | 'cat'

export type BaseBreed = {
  id: string
  name: string
  temperament: string
  life_span: string
  reference_image_id: string
}

export type Breed = Omit<BaseBreed, 'reference_image_id'> & {
  type: BreedType
  imageId: string
}