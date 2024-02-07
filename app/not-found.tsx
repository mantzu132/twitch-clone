import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-medium">404</h1>
        <p className="text-xl font-medium m-6">
          Sorry, the page you&apos;re looking for can&apos;t be found.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
