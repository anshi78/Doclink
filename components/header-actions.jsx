import { Button } from "./ui/button";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "./ui/badge";

export function HeaderActions({ user }) {
  return (
    <div className="flex items-center space-x-2">
      {/* Admin Links */}
      {user?.role === "ADMIN" && (
        <Link href="/admin">
          <Button
            variant="outline"
            className="hidden md:inline-flex items-center gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Dashboard
          </Button>
          <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
            <ShieldCheck className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {/* Doctor Links */}
      {user?.role === "DOCTOR" && (
        <Link href="/doctor">
          <Button
            variant="outline"
            className="hidden md:inline-flex items-center gap-2"
          >
            <Stethoscope className="h-4 w-4" />
            Doctor Dashboard
          </Button>
          <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
            <Stethoscope className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {/* Patient Links */}
      {user?.role === "PATIENT" && (
        <Link href="/appointments">
          <Button
            variant="outline"
            className="hidden md:inline-flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            My Appointments
          </Button>
          <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
            <Calendar className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {/* Unassigned Role */}
      {user?.role === "UNASSIGNED" && (
        <Link href="/onboarding">
          <Button
            variant="outline"
            className="hidden md:inline-flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Complete Profile
          </Button>
          <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
            <User className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {(!user || user?.role !== "ADMIN") && (
        <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
          <Badge
            variant="outline"
            className="h-9 bg-sky-900/20 border-sky-700/30 px-3 py-1 flex items-center gap-2"
          >
            <CreditCard className="h-3.5 w-3.5 text-sky-400" />
            <span className="text-sky-400">
              {user && user.role !== "ADMIN" ? (
                <>
                  {user.credits}{" "}
                  <span className="hidden md:inline">
                    {user?.role === "PATIENT" ? "Credits" : "Earned Credits"}
                  </span>
                </>
              ) : (
                <>Pricing</>
              )}
            </span>
          </Badge>
        </Link>
      )}

      {user ? (
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "shadow-xl",
              userPreviewMainIdentifier: "font-semibold",
            },
          }}
          afterSignOutUrl="/"
        />
      ) : (
        <Link href="/sign-in">
          <Button variant="secondary">Sign In</Button>
        </Link>
      )}
    </div>
  );
}
