import Image from "next/image";
import { Poppins } from "@next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const Logo = () => {
  return (
    <div className="flex flex-col items-center mb-2">
      <div className="rounded-full bg-white">
        <Image
          className="object-cover"
          src="/spooky.svg"
          alt="Gamehub logo"
          width="80"
          height="80"
        />
      </div>

      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="">Gamehub</p>
        <p className="text-sm text-muted-foreground">Let's play</p>
      </div>
    </div>
  );
};
