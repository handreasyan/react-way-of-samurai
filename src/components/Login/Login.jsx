import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";



const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={'Log In'} component={Input} name={'login'} validate={[required]}/>
      </div>
      <div>
        <Field placeholder={'Password'}  component={Input} name={'password'} validate={[required]}/>
      </div>
      <div>
        <Field name={'rememberMe'} type="checkbox"  component={Input} /> Remember Me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData)
  }

  // create API form login

  return (
    <div>
      <h1>Log In</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};
export default Login;