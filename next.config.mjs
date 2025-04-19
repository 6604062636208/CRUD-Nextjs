/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["fastly.picsum.photos"]
    },
    base: process.env.NEXT_BASE_PATH || "/CRUD-Nextjs"
};

export default nextConfig;
