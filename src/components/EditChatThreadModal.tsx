import { observer } from "mobx-react";
import "../styles/EditChatThreadModal.css";
import "../styles/Modal.css";
import PublishIcon from '@mui/icons-material/Publish';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useState } from "react";

export interface EditChatModalProps {
  isVisible: boolean;
  threadName: string;
  submitAction: () => void;
  cancelAction: () => void;
}

export interface EditChatModalState {
  name: string;
}

const defaultState = {
  name: "",
}

const EditChatThreadModal = ({isVisible, threadName, submitAction, cancelAction}: EditChatModalProps) => { 
  const [state, setState] = useState(defaultState);

  if(!isVisible) {
    return;
  }

  const onCancel = () => {
    cancelAction();
  };

  const onNameChange = (e: any) => {
    setState((prev) => {
      return {
        ...prev,
        name: e.target?.value,
      };
    });
  }

  const onSubmit = () => {
    submitAction();
  };

  return (
    <div className="modal_backdrop"> 
      <div className="modal">
        <div className="modal_content">
          <h3>Edit '{threadName}'</h3>
          <span>
            <label>New Name: </label>
            <input onChange={onNameChange} type="text" value={state.name}></input>
          </span>
        </div>
        <div className="modal_buttons">
          <button title="Submit" onClick={onSubmit}><PublishIcon/></button>
          <button title="Cancel" onClick={onCancel}><CancelPresentationIcon/></button>
        </div>
      </div>
    </div>
  );
}

export default observer(EditChatThreadModal);