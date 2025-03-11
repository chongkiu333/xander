/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/**',
            },
        ],
        domains: [
            'i.ytimg.com',
            'cdn.prod.website-files.com',
        ],
        
    },

    

};

export default nextConfig;
