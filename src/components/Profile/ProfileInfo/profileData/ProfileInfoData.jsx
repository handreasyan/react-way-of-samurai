import React from "react";

const ProfileData = ({profile, isOwner, goToEditMode}) => {
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

const Contacts = ({contacts}) => {

  const contactsKeys = Object.keys(contacts);
  return (
    <div>
      {
        contactsKeys.map(contact => {
          if (contacts[contact]) {
            return (
              <span key={contact} style={{marginLeft: '20px'}}>
                <a href={`https://${contacts[contact]}`} target='blank'>{contact}</a>
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