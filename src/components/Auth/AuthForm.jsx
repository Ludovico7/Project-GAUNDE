import { Form } from "react-router-dom"

import signup from '../../public/undraw_sign_up_n6im.svg'
import login from '../../public/undraw_access_account_re_8spm.svg'
import classes from './AuthForm.module.css'

export default function AuthForm({title, auth, data}){

  return <div className={classes.form}>
    <section>
    <h1>{title}</h1>
    <img src={auth === 'signup' ? signup : login} alt="" />
    </section>

    <Form method="POST" >
      {data && <p>Invalid email or password</p>}
      <label htmlFor="">Email</label>
      <input type="email" name="email" id="email" defaultValue={data?  data.get('email') : ''} />
      <label htmlFor="">Password</label>
      <input type="password" name="password" id="password" defaultValue={data?  data.get('password') : ''} />
      <button>{auth === 'signup' ? 'Sign Up' : 'Log In'}</button>
    </Form>
  </div>
}