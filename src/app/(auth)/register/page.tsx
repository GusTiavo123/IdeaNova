import RegisterForm from "@/components/forms/RegisterForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage(){
  const session = await getServerSession(authOptions)

  if (session) {
    return redirect("/");
  } else {
    return <RegisterForm />
  }
}