import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import ChatCard from "./ChatCard";
import { useEffect } from "react";

const ChatList = () => {
  const { chatStore } = UseGlobalStores();

  useEffect(() => {});
  
  const renderChatList = () => {
    if(chatStore.chats?.length === 0)  {
      return <p>No Chats in the Thread.</p>
    }

    return chatStore.chats.map((chat, index) => {
      return <span key={index}><ChatCard text={chat.text} chatRole={chat.role}/></span>
    });
  }

  return (
    <>
      {renderChatList()}
    </>
  );
};

export default observer(ChatList);