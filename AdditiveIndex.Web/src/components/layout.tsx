import { ReactNode } from "react";
import { TopNavBar } from "./top-navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <TopNavBar />
      <main className="max-w-[1120px] mx-auto px-4 md:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
