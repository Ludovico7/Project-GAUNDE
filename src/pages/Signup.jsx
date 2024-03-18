import { redirect } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import { signup } from '../store/firebase/auth';

export default function Signup() {
  return <AuthForm title="Sign Up for Free" auth='signup' />;
}

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const response = await signup(email, password);
  console.log(response);
  return redirect('/');
}
