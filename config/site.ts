export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "USD Stablecoins TV",
  description:
    "Shadcn table with server side sorting, pagination, and filtering",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://table.sadmn.com",
  links: { github: "https://github.com/sadmann7/shadcn-table" },
};