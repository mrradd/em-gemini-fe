import { observer } from "mobx-react";
import "../styles/EditChatThreadModal.css";
import "../styles/Modal.css";
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from "react";

export interface EditChatModalProps {
  isVisible: boolean;
}

export interface EditChatModalState {
  name: string;
}

const defaultState = {
  name: "",
}

const EditChatThreadModal = ({isVisible}: EditChatModalProps) => { 
  const [state, setState] = useState(defaultState);

  if(!isVisible) {
    return;
  }

  const onNameChange = (e: any) => {
    setState((prev) => {
      return {
        ...prev,
        name: e.target?.value,
      };
    });
  }

  const onSubmit = () => {
    console.log("$$$herp derp");
  }

  return (
    <div className="modal_backdrop"> 
      <div className="modal">
        <div className="modal_content">
          <h3>Edit Thread</h3>
          <span>
            <label>Name: </label>
            <input onChange={onNameChange} type="text" value={state.name}></input>
          </span>
        </div>
        <button onClick={onSubmit}><PublishIcon/></button>
      </div>
    </div>
  );
}

export default observer(EditChatThreadModal);