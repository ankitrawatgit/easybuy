/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'apollo.olx.in',
            port: '',
        },
        {
            protocol: 'https',
            hostname: '**.*.com',
            port: '',
        },
        {
            protocol: 'https',
            hostname: '**.*.co',
            port: '',
        }
    ]

    },
    async rewrites(){
        return [
            {
            source:'/api/:path*',
            destination:'https://easyybuybackend.vercel.app/:path*'     
            }
        ]
    }
};

export default nextConfig;
