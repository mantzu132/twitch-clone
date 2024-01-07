import Navbar from "@/app/(browse)/_components/navbar";
import Sidebar, { SidebarSkeleton } from "@/app/(browse)/_components/sidebar";
import { Container } from "@/app/(browse)/_components/container";
import { Suspense } from "react";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
}
