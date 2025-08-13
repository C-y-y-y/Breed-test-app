import { Breed } from '@/types'
import { getImageUrl } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type BreedCardProps = Pick<Breed, 'id' | 'name' | 'imageId' | 'type'>

export default function BreedCard({ id, name, imageId, type }: BreedCardProps ) {
  const urls = getImageUrl(type, imageId)
  const [src, setSrc] = useState(urls[0])

  return (
    <Link
      href={`/breed/${id}`} 
      className="cursor-pointer rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full h-80">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading='lazy'
          blurDataURL={src}
          placeholder="blur"
          onError={() => {
            const nextIndex = urls.indexOf(src) + 1
            if (nextIndex < urls.length) setSrc(urls[nextIndex])
          }}
        />
      </div>
      <div className="p-4 text-center font-semibold">{name}</div>
    </Link>
  )
}