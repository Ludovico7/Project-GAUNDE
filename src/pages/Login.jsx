import { redirect, useActionData } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';
import { login } from '../store/firebase/auth';

export default function Login() {
  const data = useActionData();
  return <AuthForm title="Log In" auth='login' data={data}/>;
}

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const isAuth = await login(email, password);
  if(isAuth.code === 'auth/invalid-credential' || isAuth.code === 'auth/too-many-requests'){
    return data;
  }
  return redirect('/');
}
