import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import ChatCard from "./ChatCard";
import { useMemo } from "react";

const ChatList = () => {
  const { chatStore } = UseGlobalStores();
  
  const renderChatList = useMemo(() => {
    if(chatStore.workingChatThread?.chats?.length === 0)  {
      return <p>No chats in the thread.</p>
    }

    let chats: any[] = [];
    chatStore.workingChatThread?.chats?.forEach((chat, index) => {
      chats.push(
        <div key={index}>
          <ChatCard text={chat.prompt} chatRole={"user"}/>
          <ChatCard text={chat.response} chatRole={"system"}/>
        </div>
      );
    });

    return chats;
  }, [chatStore.workingChatThread, chatStore.workingChatThread?.chats]);

  return (
    <>
      {renderChatList}
    </>
  );
};

export default observer(ChatList);