import configPromise from "@payload-config";
import { getPayload } from "payload";

// "db:seed": "npm run seed.ts"

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "users",
  });

  return Response.json(data);
};
