import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import { useState } from "react";
import type ChatDto from "../dtos/ChatDto";
import type ChatModel from "../models/ChatModel";
import { dtoToChatModel } from "../models/ChatModel";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

interface ChatBoxState {
  awaitingResponse: boolean,
}

const defaultState: ChatBoxState = {
  awaitingResponse: false,
}

/**
 * Displays a TextArea which allows the user to type in a prompt for Gemini. 
 */
const ChatBox = () => {
  const [state, setState] = useState(defaultState);
  const {chatBoxStore, chatStore} = UseGlobalStores();

  const updateChatText = (value: string) => {
    chatBoxStore.setTextAreaContent(value);  
  }

  const sendChatRequestAndUpdate = async () => {
    try {
      setState((prev) => {
        return {
          ...prev,
          awaitingResponse: true,
        };
      });

      const response: ChatDto | null = await chatStore.sendChatRequest(chatBoxStore.textAreaContent);

      console.log(response);
      const chat: ChatModel = dtoToChatModel(response!);
      chatStore.appendChatToThread(chat);
    }
    finally {
      setState((prev) => {
        return {
          ...prev,
          awaitingResponse: false,
        };
      });
    }
  }

  return (
    <>
      <textarea value={chatBoxStore.textAreaContent} onChange={(e) => updateChatText(e.target.value)}></textarea>
      <div className="chatbox_button_container">
        <button title="Send Prompt" onClick={sendChatRequestAndUpdate} disabled={state.awaitingResponse}>
          {state.awaitingResponse ? <PendingOutlinedIcon/> : <SendOutlinedIcon/>}
        </button>
      </div>
    </>
  );
};

export default observer(ChatBox);