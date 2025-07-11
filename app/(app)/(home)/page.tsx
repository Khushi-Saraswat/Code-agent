import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React from "react";

const Home = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "users",
  });

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Home;
