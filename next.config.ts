import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://cdn2.thedogapi.com/**'), 
      new URL('https://cdn2.thecatapi.com/**')
    ],
  },
}

export default nextConfig
