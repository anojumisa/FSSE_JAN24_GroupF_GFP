/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ["storage.googleapis.com", "example.com", "example2.com" ],
  },
};

module.exports = {
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    };
  },
};

export default nextConfig;
