"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Video, Phone } from "lucide-react";

export function AppointmentCard({
  appointment = null,
  userRole,
  refetchAppointments,
}) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [notes, setNotes] = useState(appointment?.notes || "");
  const router = useRouter();

  if (!appointment) {
    return (
      <Card className="p-4 text-center">
        <p className="text-muted-foreground">No appointment data</p>
      </Card>
    );
  }

  const isAppointmentTime = () => {
    const now = new Date();
    const startTime = new Date(appointment.startTime);
    const endTime = new Date(appointment.endTime);
    return now >= startTime && now <= endTime;
  };

  const canJoinCall = appointment.status === "SCHEDULED" && isAppointmentTime();

  const handleJoinCall = () => {
    if (appointment.videoSessionId && appointment.videoSessionToken) {
      router.push(
        `/video-call?sessionId=${appointment.videoSessionId}&token=${appointment.videoSessionToken}`
      );
    }
  };

  const handleAction = async (status) => {
    try {
      const res = await fetch(`/api/appointments/${appointment?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (!res.ok) throw new Error("Failed to update appointment");

      if (refetchAppointments) await refetchAppointments();
      setOpen(false);
      setAction(null);
      router.refresh();
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  return (
    <Card className="border-sky-900/20">
      <CardHeader>
        <CardTitle className="text-white">
          Appointment with{" "}
          {appointment?.doctor?.name || appointment?.patient?.name || "Unknown"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            <strong>Date & Time:</strong>
          </p>
          <p className="text-white">
            {appointment?.startTime
              ? format(new Date(appointment.startTime), "MMM d, yyyy 'at' h:mm a")
              : "N/A"}{" "}
            -{" "}
            {appointment?.endTime
              ? format(new Date(appointment.endTime), "h:mm a")
              : "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">
            <strong>Status:</strong>
          </p>
          <p className="text-white capitalize">{appointment?.status || "N/A"}</p>
        </div>

        {appointment.notes && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              <strong>Notes:</strong>
            </p>
            <p className="text-white">{appointment.notes}</p>
          </div>
        )}

        <Textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-background border-sky-900/20"
        />

        <div className="flex flex-col gap-2">
          {canJoinCall && (
            <Button
              onClick={handleJoinCall}
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              <Video className="h-4 w-4 mr-2" />
              Join Video Call
            </Button>
          )}

          {appointment.status === "SCHEDULED" && !isAppointmentTime() && (
            <p className="text-sm text-muted-foreground text-center py-2">
              Video call will be available at appointment time
            </p>
          )}

          {userRole === "DOCTOR" && (
            <>
              <Button
                onClick={() => handleAction("completed")}
                className="bg-sky-600 hover:bg-sky-700"
              >
                Mark Completed
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction("cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
          {userRole === "PATIENT" && (
            <Button
              variant="destructive"
              onClick={() => handleAction("cancelled")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Cancel Appointment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
