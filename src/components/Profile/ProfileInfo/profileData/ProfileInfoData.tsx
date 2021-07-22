import React from "react";
import {ContactsType, ProfileType} from "../../../../types/types";

type ProfileDataType = {
  profile:ProfileType,
  isOwner?:boolean,
  goToEditMode?:any
}

const ProfileData:React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
  return (
    <div>
      {
        <div>
          <b>Looking For Job: </b>{profile.lookingForAJob ? "Yes" : "No"}
        </div>
      }
      <br/>
      {
        profile.lookingForAJobDescription &&
        <div>
          <b>My Professional skills: </b>
          {profile.lookingForAJobDescription}
        </div>
      }
      <br/>
      {
        profile.aboutMe &&
        <div>
          <b>About Me: </b>
          {profile.aboutMe}
        </div>
      }
      <br/>
      { // contacts default value is null
        Object.values(profile.contacts)[0] &&
        <div>
          <b>My Contacts: </b>
            <Contacts contacts={profile.contacts}/>
        </div>
      }
    </div>
  )

}

type ContactsPropsType = {
  contacts:ContactsType
}

const Contacts:React.FunctionComponent<ContactsPropsType> = ({contacts}) => {

  const contactsKeys = Object.keys(contacts);
  return (
    <div>
      {
        contactsKeys.map((contact)  => {
          if (contacts[contact as keyof ContactsType ]) {
            return (
              <span key={contact as keyof ContactsType } style={{marginLeft: '20px'}}>
                <a href={`https://${contacts[contact as keyof ContactsType ]}`} target='blank'>{contact}</a>
              </span>
            )
          }
          return null
        })
      }
    </div>
  )

}

export default ProfileData