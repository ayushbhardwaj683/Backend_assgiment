import { redirect } from "next/navigation";

export default function Home() {
  // Instantly redirects anyone visiting localhost:3000 to the login page
  redirect("/login");
}