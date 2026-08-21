import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory makes Next infer C:\Users\Zainul
  // as the workspace root, which breaks client-manifest resolution in dev.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
