import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";
import type ChatThreadModel from "../models/ChatThreadModel";

/**
 * Displays a list of Chat Threads from the database. Also allows for pressing a button to create a new Chat Thread.
 */
const ChatThreadList = () => {
  const {chatStore} = UseGlobalStores();
  
  const createNewThread = async () => {
    const result: ChatThreadResponseDto | null = await chatStore.createNewChatThread();

    if(result == null) {
      alert("Failed to create a new Chat Thread.");
      return;
    }

    chatStore.appendChatThread({
      id: result?.id,
      createdDate: result?.created_date,
      title: result?.title,
    } as ChatThreadModel)
  }

  const renderChatThreads = () => {
    const threads = chatStore.chatThreads.map((thread, index) => {
      return (
        <div key={index}>
          <span>{thread.title} - {thread.createdDate}</span>
        </div>
      );
    });

    return threads;
  }

  return (
    <>
      <div className="thread_container">
        {renderChatThreads()}
      </div>
      <div className="thread_buttons_container">
        <button onClick={createNewThread}>New Thread</button>
      </div>
    </>
  );
};

export default observer(ChatThreadList);