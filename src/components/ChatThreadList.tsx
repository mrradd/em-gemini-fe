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

  const deleteThread = (threadId: string) => {
    console.log(`$$$ clicked deleteThread ${threadId}`);
  };

  const editThreadDetails = (threadId: string) => {
    console.log(`$$$ clicked editThreadDetails ${threadId}`);
  };

  const viewThread = async (threadId: string) => {
    console.log(`$$$ clicked viewThread ${threadId}`);
    const thread: ChatThreadResponseDto | null = await chatStore.getChatThread(threadId);

    if(!thread) {
      alert("There was an issue getting the thread.");
    }
    console.log(thread);
    chatStore.setWorkingChatThread(thread!);
  };

  const renderChatThreads = () => {
    const threads = chatStore.chatThreads.map((thread, index) => {
      return (
        <div key={index}>
          <span>{thread.title} - {thread.createdDate}</span>
          <button onClick={() => editThreadDetails(thread.id)}>Edit</button>
          <button onClick={() => deleteThread(thread.id)}>Delete</button>
          <button onClick={() => viewThread(thread.id)}>View</button>
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