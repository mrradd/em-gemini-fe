import { observer } from "mobx-react";
import { useState } from "react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import ChatApi from "../apis/ChatApi";

/**
 * Displays a TextArea which allows the user to type in a prompt for Gemini. 
 */
const ChatBox = () => {
  const {chatBoxStore} = UseGlobalStores();

  const handleOnChange = (value: string) => {
    chatBoxStore.setTextAreaContent(value);  
  }

  const handleOnClick = async () => {
    await ChatApi.sendChat(chatBoxStore.textAreaContent);
  }

  return (
    <>
      <textarea value={chatBoxStore.textAreaContent} onChange={(e) => handleOnChange(e.target.value)}></textarea>
      <button onClick={handleOnClick}>Do Some Chattn</button>
    </>
  );
};

export default observer(ChatBox);