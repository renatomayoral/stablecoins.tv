export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Stablecoins TV",
  description:
    "Shadcn table with server side sorting, pagination, and filtering",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://stablecoins-tv.vercel.app/",
  links: { github: "https://github.com/sadmann7/shadcn-table" },
};