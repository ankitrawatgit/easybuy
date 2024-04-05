/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol: 'https',
            hostname: 'store.storeimages.cdn-apple.com',
            port: '',
            pathname: '/4982/as-images.apple.com/**',
        }]
        
    }
};

export default nextConfig;
