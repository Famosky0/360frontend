import { redirect } from "next/navigation";

export default function PrivateService() {
  return redirect("/u/admin");
}
