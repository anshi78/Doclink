"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Medal, FileText } from "lucide-react";

export function DoctorCard({ doctor }) {
  const router = useRouter();

  const handleViewProfile = () => {
    // Navigate to doctor's individual profile page
    router.push(`/doctors/${encodeURIComponent(doctor.specialty)}/${doctor.id}`);
  };

  return (
    <Card className="border-sky-900/20 hover:border-sky-900/40 transition-colors cursor-pointer overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg text-white">
              Dr. {doctor.name}
            </CardTitle>
            <Badge variant="outline" className="mt-2 bg-sky-900/20 border-sky-900/30 text-sky-400">
              {doctor.specialty}
            </Badge>
          </div>
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-sky-900/20 flex-shrink-0">
            {doctor.imageUrl ? (
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-8 w-8 text-sky-400" />
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Medal className="h-4 w-4 text-sky-400" />
          <span className="text-sm">{doctor.experience} years experience</span>
        </div>

        {doctor.description && (
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground line-clamp-2">
              {doctor.description}
            </p>
          </div>
        )}

        <Button
          onClick={handleViewProfile}
          className="w-full bg-sky-600 hover:bg-sky-700 mt-4"
        >
          View Profile & Book
        </Button>
      </CardContent>
    </Card>
  );
}
