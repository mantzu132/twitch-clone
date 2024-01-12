import { currentUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard, LogOut } from "lucide-react";

const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-5">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/">
          <LogOut className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Actions;
