import { auth } from "@/lib/auth";
import { HomeView } from "@/module/home/ui/views/home-view";
import { caller } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <HomeView />;
};

export default Home;
