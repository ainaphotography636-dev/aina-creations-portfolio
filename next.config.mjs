import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pub-ab0998a4fe7f4f52be6a61debd869993.r2.dev",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: "https://pub-ab0998a4fe7f4f52be6a61debd869993.r2.dev/:path*",
      },
    ];
  },
};

export default withMDX(nextConfig);
