import React, {ChangeEvent} from 'react';
import styles from "./ProfileInfo.module.css";

// sa petq chi , lriv poxelem grel Hook _ erov , ProfileStatusWithHooks filena arden actual

type PropsType = {
  status:string
  updateUserStatus:(status:string) => void
}
type StateType = {
  editMode:boolean,
  status:string
}

class ProfileStatus extends React.Component<PropsType,StateType> {
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
  onStatusChange = (event:ChangeEvent<HTMLInputElement>)  =>  {
    this.setState({ status:event.currentTarget.value });
  }

  componentDidUpdate(prevProps:PropsType, prevState:StateType) {
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