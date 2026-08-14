import { LayoutProvider } from "./LayoutProvider";

export default function ({ children }: { children: React.ReactNode }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
