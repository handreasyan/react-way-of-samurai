import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, LoginFormValuesType, LoginFromValuesTypeKeys, ReturnField} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/authReaducer";
import {Redirect} from "react-router-dom";
import styles from '../common/FormsControls/FormsControl.module.css'
import {AppStateType} from "../../redux/redux_store";

type LoginFormOwnProps = {
  captchaUrl:string | null
}

type IPorps = React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps>

const LoginForm:IPorps = ({handleSubmit,error,captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>

      {/* stex zut functionnerovem Fieldner drel vor typescripti ognutyamb name voroshem , aysinqn typescriptna tealdrum te namey inj karam dnem , formsControl fileum tencem sarqel , bayc mnacac texerum sovorakan Fieldner en , u normal erku dzevovel ashxatuma */}
      {ReturnField<LoginFromValuesTypeKeys>('Email',Input,'email',[required])}
      {ReturnField<LoginFromValuesTypeKeys>('Password',Input,'password',[required],'password')}
      {ReturnField<LoginFromValuesTypeKeys>('',Input,'rememberMe',[],'checkbox')}
      {captchaUrl && <img src={captchaUrl} alt="captcha"/> }
      {captchaUrl && ReturnField('Enter Symbols from Captcha',Input,'captcha',[required])}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div> <button>Login</button> </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({form:'login'})(LoginForm);


type MSTPType = {
  captchaUrl:string | null,
  isAuth:boolean
}
type MDTPType = {
  login:(email:string,password:string,rememberMe:boolean,captcha:string)=>void
}


const Login:React.FC<MSTPType & MDTPType> = ({login,isAuth,captchaUrl}) => {

  const onSubmit = (formData:LoginFormValuesType) => {
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

const mstp = (state:AppStateType):MSTPType => ({
  captchaUrl:state.auth.captchaUrl,
  isAuth:state.auth.isAuth
})

export default connect(mstp , { login } )(Login);