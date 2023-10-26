/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    webpack: (config) => {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
      });
  
      return config;
    },
    images: {
      domains: ["lh3.googleusercontent.com", "images.pexels.com","utfs.io"],
    },
  };
  
  module.exports = nextConfig;
  