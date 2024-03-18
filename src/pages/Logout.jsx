import { redirect } from "react-router-dom";
import { logout } from "../store/firebase/auth";

export async function action(){
  await logout();
  return redirect('/');
}