'use client'

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in"); // redirect to login page
              },
            },
          });
        }}
      >
        log out
      </Button>
    </div>
  );
}
