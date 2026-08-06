import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Il CMS è headless: la radice rimanda al pannello admin */
  redirects: async () => [
    {
      source: '/',
      destination: '/admin',
      permanent: false,
    },
  ],
}

export default withPayload(nextConfig)
