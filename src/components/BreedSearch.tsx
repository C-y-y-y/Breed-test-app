'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function BreedSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [value, setValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      router.replace(`?${params.toString()}`)
    }, 300)
    return () => clearTimeout(timeout)
  }, [value, router, searchParams])

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search breeds..."
      className="border px-4 py-2 rounded w-full max-w-md"
    />
  )
}
