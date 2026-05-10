/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/.next/**", "**/node_modules/**", "**/.playwright-mcp/**"],
    }

    return config
  },
}

export default nextConfig
