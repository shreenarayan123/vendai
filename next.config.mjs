/** @type {import('next').NextConfig} */

const nextConfig = {
   
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'ucarecdn.com',
              port: '',
              pathname: '/**',
              search: '',
            },
          ],
        },
        eslint: {
    ignoreDuringBuilds: true,
  },
      
};

export default nextConfig;
