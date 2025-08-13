import { getBreedById, getBreedImages } from '@/api/breeds'
import Image from 'next/image'
import { DOG_FIELD_LABELS, CAT_FIELD_LABELS } from '@/constants/fieldLabels'
import renderField from './renderField'
import Link from 'next/link'

type Props = {
  params: { id: string }
}

export default async function BreedPage({ params }: Props) {
  const { id } = await params
  const breed = await getBreedById(id)

  if (!breed) {
    throw new Error("Breed not found")
  }

  const labels = breed.type === 'dog' ? DOG_FIELD_LABELS : CAT_FIELD_LABELS

  const keysToRender = labels && breed
    ? Object.keys(labels).filter(key => breed[key] !== undefined && breed[key] !== null)
    : []

  const pureId = id.split('-')[1]
  const images = await getBreedImages(breed.type, pureId)

  return (
    <main className="min-h-screen bg-amber-50">
      <Link
        href="/"
        className="absolute top-4 left-4 bg-white/50 rounded p-2 z-50 shadow flex items-center justify-center group"
        aria-label="Go back home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 transition-transform duration-200 ease-in-out group-hover:-translate-x-1"          
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
      <div className="relative w-screen aspect-[16/9] rounded overflow-hidden grid grid-cols-2 grid-rows-2">
        {images.slice(0, 4).map((img, index) => (
          <div key={img.id} className="relative">
            <Image
              src={img.url}
              alt={breed.name}
              fill
              className="object-cover object-top"
              sizes="50vw"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black opacity-20 rounded" />

        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl font-extrabold drop-shadow-lg text-center px-4">
          {breed.name}
        </h1>
      </div>

      <div className="p-8">
        {keysToRender.map(key => renderField(key, breed[key], labels))}
      </div>
    </main>
  )
}
