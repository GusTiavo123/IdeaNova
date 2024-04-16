import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DeletePostForm from "@/components/forms/DeletePostForm";

const DeletePostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  } else {
    return (
      <DeletePostForm />
    );
  }
};

export default DeletePostPage;
