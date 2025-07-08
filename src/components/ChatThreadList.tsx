import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";
import type ChatThreadModel from "../models/ChatThreadModel";
import { useEffect, useRef } from "react";
import type GetAllChatThreadsResponseDto from "../dtos/GetAllChatThreadsResponseDto";
import { dtoToChatThreadModel } from "../models/ChatThreadModel";

/**
 * Displays a list of Chat Threads from the database. Also allows for pressing a button to create a new Chat Thread.
 */
const ChatThreadList = () => {
  const {chatStore} = UseGlobalStores();
  const gotThreads = useRef(false);
  
  useEffect(() => {
    if(!gotThreads.current) {
      gotThreads.current = true;
      getChatThreads();
    }
  }, []);

  const getChatThreads = async () => {
    const threads: GetAllChatThreadsResponseDto | null = await chatStore.getChatThreads();
    threads?.threads.forEach((thread) => {
      chatStore.appendChatThread(dtoToChatThreadModel(thread));
    });
  };

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
  };

  const deleteThread = () => {
    console.log("$$$ clicked deleteThread");
  };

  const editThreadDetails = () => {
    console.log("$$$ clicked editThreadDetails");
  };

  const viewThread = () => {
    console.log("$$$ clicked viewThread");
  };

  const renderChatThreads = () => {
    const threads = chatStore.chatThreads.map((thread, index) => {
      return (
        <div key={index}>
          <span>{thread.title} - {thread.createdDate}</span>
          <button onClick={editThreadDetails}>Edit</button>
          <button onClick={deleteThread}>Delete</button>
          <button onClick={viewThread}>View</button>
        </div>
      );
    });

    return threads;
  };

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