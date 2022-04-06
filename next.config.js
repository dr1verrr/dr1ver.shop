module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_API_DOMAIN,
      process.env.NEXT_PUBLIC_API_URL,
      'via.placeholder.com',
      'res.cloudinary.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
}
