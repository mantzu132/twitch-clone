import { Logo } from "@/app/(browse)/_components/navbar/logo";
import Search from "@/app/(browse)/_components/navbar/search";
import Actions from "@/app/(browse)/_components/navbar/actions";

const Navbar = () => {
  return (
    <nav className="fixed top-0 h-20 flex items-center px-2 lg:px-4 bg-[#252731] w-full z-[49] shadow-sm justify-between">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};

export default Navbar;
