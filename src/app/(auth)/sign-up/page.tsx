import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { SignUpView } from "@/module/auth/ui/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <SignUpView />;
}
