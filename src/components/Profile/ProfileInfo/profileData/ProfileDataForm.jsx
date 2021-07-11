import React from "react";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import styles from "../../../common/FormsControls/FormsControl.module.css";

const ProfileDataForm = ({handleSubmit, profile,error}) => {

  const contacts = Object.keys(profile.contacts).map(key => {
    return (
      <span key={key}>
        <b>{key}:</b>
        <Field placeholder={'Enter Full Name'} component={Input} name={`contacts.${key}`}/>
      </span>
    )
  })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <b>Enter Full Name :</b>
        <Field placeholder={'Enter Full Name'} component={Input} name={'fullName'}/>
      </div>
      <br/>
      <div>
        <b>Looking for a job :</b>
        <Field type="checkbox" component={Input} name={'lookingForAJob'}/>
      </div>
      <br/>
      <div>
        <b>My Professional skills :</b>
        <Field placeholder={'My Professional skills'} component={Textarea} name={'lookingForAJobDescription'}/>
      </div>
      <br/>
      <div>
        <b>About Me :</b>
        <Field placeholder={'About Me'} component={Textarea} name={'aboutMe'}/>
      </div>
      <b>Contacts: </b>
      <br/> {contacts}
    </form>
  )

}

const ProfileDataReduxForm = reduxForm({form: 'editProfile'})(ProfileDataForm);

export default ProfileDataReduxForm