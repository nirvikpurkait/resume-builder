import LoginForm from "@/components/login-form/login-form";
import { cn } from "@/lib/shadcn-ui/utils";
import { role } from "@/utils/cookies/cookie-name";
import { getCookie } from "@/utils/cookies/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const usertype = getCookie(role);
  if (usertype === "ADMIN") {
    redirect("/admin");
  }
  if (usertype === "STUDENT") {
    redirect("/student");
  }

  return (
    <main className="relative flex min-h-[100vh] items-center justify-center">
      <Image
        src={
          "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        alt="background-image"
        fill
        className={cn(`absolute h-full w-full opacity-30`)}
      />
      <LoginForm />
    </main>
  );
}
