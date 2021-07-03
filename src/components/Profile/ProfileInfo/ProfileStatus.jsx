import React from 'react';
import styles from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode:false,
    status:this.props.status
  };
  activateEditMode = () =>  {
    this.setState({editMode:true})
  }
  deactivateEditMode = () => {
    this.setState({editMode:false})
    this.props.updateUserStatus(this.state.status)
  }
  onStatusChange = (event)  =>  {
    this.setState({ status:event.currentTarget.value });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.status !== this.props.status){
      this.setState({
        status:this.props.status
      })
    }
  }

  render() {
    return (
      <div className={styles.defStatusContent}>
        <h1>Default Status Content</h1><br/>
        <div>
        {
          !this.state.editMode && <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Not Have a Status !'}</span>
        }
        {
          this.state.editMode &&
          <input type="text" value={this.state.status} onBlur={this.deactivateEditMode} autoFocus={true} onChange={this.onStatusChange}/>
        }
        </div>
      </div>
    );
  }
};

export default ProfileStatus;