/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "salomonsports.co.za",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.static-src.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.lazcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sg-test-11.slatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.807garage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Domain untuk Avatar Google
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Domain untuk Avatar GitHub
        port: "",
        pathname: "/**", // Path untuk avatar GitHub
      },
    ],
  },
};

module.exports = nextConfig;
