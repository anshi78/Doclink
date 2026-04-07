import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import { checkAndAllocateCredits } from "@/actions/credits";
import Image from "next/image";
import { HeaderActions } from "./header-actions";

export default async function Header() {
  let user = null;
  
  try {
    user = await checkUser();
    if (user?.role === "PATIENT") {
      await checkAndAllocateCredits(user);
    }
  } catch (error) {
    console.error("Header: Failed to fetch user:", error);
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/Logo1.png"
            alt="DocLink Logo"
            width={300}
            height={100}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Action Buttons */}
        <HeaderActions user={user} />
      </nav>
    </header>
  );
}
