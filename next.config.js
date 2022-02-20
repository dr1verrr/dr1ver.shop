module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_API_URL, 'via.placeholder.com'],
  },
}
