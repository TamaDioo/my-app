/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Domain untuk Avatar Google
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Domain untuk Avatar GitHub
      },
    ],
  },
};

module.exports = nextConfig;
