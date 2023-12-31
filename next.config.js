/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'files.edgestore.dev',
              port: '',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'source.unsplash.com',
              port: '',
              pathname: '**',
            }
          ],
        }
}

module.exports = nextConfig
