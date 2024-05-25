import LoginForm from "@/components/login-form/login-form";
import { cn } from "@/lib/shadcn-ui/utils";
import Image from "next/image";

export default function HomePage() {
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
