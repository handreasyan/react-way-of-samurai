import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/authReaducer";
import {Redirect} from "react-router-dom";
import styles from '../common/FormsControls/FormsControl.module.css'


const LoginForm = ({handleSubmit,error,captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field placeholder={'Email'} component={Input} name={'email'} validate={[required]}/>
      </div>
      <div>
        <Field placeholder={'Password'} type='password' component={Input} name={'password'} validate={[required]}/>
      </div>
      <div>
        <Field name={'rememberMe'} type="checkbox"  component={Input} /> Remember Me
      </div>
      {captchaUrl && <img src={captchaUrl} alt="captcha"/> }
      {captchaUrl && <Field placeholder={'Enter Symbols from Captcha'} component={Input} name={'captcha'} validate={[required]}/> }
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div> <button>Login</button> </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

const Login = ({login,isAuth,captchaUrl}) => {

  const onSubmit = (formData) => {
    login(formData.email,formData.password,formData.rememberMe,formData.captcha)
  }

  if(isAuth) return <Redirect to={'/profile'}/>

  return (
    <div>
      <h1>Log In</h1>
      <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
    </div>
  );
};

const mstp = (state) => ({
  captchaUrl:state.auth.captchaUrl,
  isAuth:state.auth.isAuth
})

export default connect(mstp , { login } )(Login);