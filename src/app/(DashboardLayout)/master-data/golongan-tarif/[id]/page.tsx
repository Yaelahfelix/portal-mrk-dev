import React from "react";
import View from "./view";
import { redirect } from "next/navigation";
type Params = Promise<{ id: string }>;

export const metadata = {
  title: "Detail Golongan Tarif",
};
const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  if (!id) {
    return redirect("/master-data/golongan-tarif");
  }

  return <View id={id} />;
};

export default Page;
