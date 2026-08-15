import { LayoutProvider } from "./LayoutProvider";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
