/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_USER_ID: 'jora',
    MONGO_USER_PASSWORD: 'emPvJbvkwZU8mdbg',
    MONGO_DB_NAME: 'barkleys'
  }
}

module.exports = nextConfig