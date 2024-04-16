import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AddPostForm from "@/components/forms/AddPostForm";

const AddPostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  } else {
    return (
      <AddPostForm />
    );
  }
};

export default AddPostPage;
