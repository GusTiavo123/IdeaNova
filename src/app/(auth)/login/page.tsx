import LoginForm from "@/components/forms/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage(){
  const session = await getServerSession(authOptions)


  if (session) {
    return redirect("/");
  } else {
    return <LoginForm />
  }
}