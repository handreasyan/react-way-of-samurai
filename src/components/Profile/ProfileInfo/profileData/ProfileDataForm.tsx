import React from "react";
import {getStringKeys, Input, ReturnField, Textarea} from "../../../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../../common/FormsControls/FormsControl.module.css";
import {ProfileType} from "../../../../types/types";

type PropsType = {
  profile:ProfileType,
}
type ProfileTypeKeys = getStringKeys<ProfileType>

const ProfileDataForm:React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType> = ({handleSubmit, profile,error}) => {

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
        {ReturnField<ProfileTypeKeys>('Enter Full Name', Input, 'fullName', [], '', '')}
      </div>
      <br/>
      <div>
        <b>Looking for a job :</b>
        {ReturnField<ProfileTypeKeys>('', Input, 'lookingForAJob', [], 'checkbox', '')}
      </div>
      <br/>
      <div>
        <b>My Professional skills :</b>
        {ReturnField<ProfileTypeKeys>('My Professional skills', Textarea, 'lookingForAJobDescription', [], 'checkbox', '')}
      </div>
      <br/>
      <div>
        <b>About Me :</b>
        {ReturnField<ProfileTypeKeys>('About Me', Textarea, 'aboutMe', [], 'checkbox', '')}
      </div>
      <b>Contacts: </b>
      <br/> {contacts}
    </form>
  )

}

const ProfileDataReduxForm = reduxForm<ProfileType,PropsType>({form: 'editProfile'})(ProfileDataForm);

export default ProfileDataReduxForm