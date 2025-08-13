'use client'
import BreedCard from '@/components/BreedCard'
import BreedSearch from '@/components/BreedSearch'
import Loading from '@/components/Loading'
import { useRandomBreeds } from '@/hooks/useRandomBreeds'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center p-6 bg-amber-50">
      <Suspense fallback={<Loading />}>
        <HomeContent />
      </Suspense>
    </main>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const { data: breeds = [], isLoading, error } = useRandomBreeds(10, searchQuery)

  if (error) return <div>Error loading breeds</div>

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Random Cat & Dog Breeds</h1>
      <BreedSearch /> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <Loading />
        ) : (
          breeds.map((breed) => (
            <BreedCard
              key={breed.id}
              id={breed.id}
              name={breed.name}
              imageUrl={breed.imageUrl}
            />
          ))
        )}
      </div>
    </>
  )
}
