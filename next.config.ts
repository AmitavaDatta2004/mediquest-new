import type {NextConfig} from 'next';
import {genkitNextPlugin} from '@genkit-ai/next/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  ...genkitNextPlugin(),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
