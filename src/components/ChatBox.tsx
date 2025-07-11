import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import { useState } from "react";
import type ChatResponseDto from "../dtos/ChatResponseDto";
import type ChatModel from "../models/ChatModel";
import { dtoToChatModel } from "../models/ChatModel";

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

      const response: ChatResponseDto | null = await chatStore.sendChatRequest(chatBoxStore.textAreaContent);

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
        <button onClick={sendChatRequestAndUpdate} disabled={state.awaitingResponse}>
          {state.awaitingResponse ? "Waiting..." : "Send Request"}
        </button>
      </div>
    </>
  );
};

export default observer(ChatBox);