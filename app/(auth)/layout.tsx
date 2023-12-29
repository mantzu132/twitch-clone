import { ClerkProvider } from "@clerk/nextjs";
import { Logo } from "@/app/(auth)/_components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Logo />
      {children}
    </div>
  );
}
