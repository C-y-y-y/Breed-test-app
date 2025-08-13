import { Breed } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type BreedCardProps = Pick<Breed, 'id' | 'name' | 'imageUrl'>

export default function BreedCard({ id, name, imageUrl }: BreedCardProps ) {
  return (
    <Link
      href={`/breed/${id}`} 
      className="cursor-pointer rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full h-80">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading='lazy'
          blurDataURL={imageUrl}
          placeholder="blur"
        />
      </div>
      <div className="p-4 text-center font-semibold">{name}</div>
    </Link>
  )
}