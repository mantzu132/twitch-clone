import { getSelfbyUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import Navbar from "@/app/(dashboard)/u/[username]/_components/navbar";
import { Sidebar } from "@/app/(dashboard)/u/[username]/_components/sidebar";
import { Container } from "@/app/(dashboard)/u/[username]/_components/sidebar/container";

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getSelfbyUsername(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />

      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
