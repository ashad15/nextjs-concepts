"use client";

import { HomeProvider } from "@/store/context/HomeContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>this is layout</h1>
      <HomeProvider>{children}</HomeProvider>
    </div>
  );
}
