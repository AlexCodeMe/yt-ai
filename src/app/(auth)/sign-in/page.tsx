import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { SignInView } from "@/module/auth/ui/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return <SignInView />;
}

export default page;
