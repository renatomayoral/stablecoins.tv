//id Stable: 604f2753ebccdd50cd175fc1
import type { NextApiRequest, NextApiResponse } from "next";

export default async function fetchStablecoins(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=625d04fa57c0560770d004e1",
        {
          method: "GET",
          headers: {
            "X-CMC_PRO_API_KEY": "c94fe46f-e969-4170-97ee-094de3ad54b8",
          },
        },
      );
      const data = await response.json();
      console.log("Fetched stablecoins:", data);
      res.status(200).json(data);
    } catch (_error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
