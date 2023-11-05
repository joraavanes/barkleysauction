/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mystifying-khayyam-9evvnoqws.storage.iran.liara.space",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
