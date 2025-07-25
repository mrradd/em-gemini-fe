import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import type ChatThreadDto from "../dtos/ChatThreadDto";
import type ChatThreadModel from "../models/ChatThreadModel";
import { useEffect, useMemo, useRef } from "react";
import type GetAllChatThreadsResponseDto from "../dtos/GetAllChatThreadsResponseDto";
import { dtoToChatThreadModel } from "../models/ChatThreadModel";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ChatThreadCard from "./ChatThreadCard";

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
    const result: ChatThreadDto | null = await chatStore.createNewChatThread();

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

  const renderChatThreads = useMemo(() => {
    const threads = chatStore.chatThreads.map((thread, index) => {
      return (
        <span key={index}>
          <ChatThreadCard threadId={thread.id} threadCreatedDate={thread.createdDate} threadTitle={thread.title}/>
        </span>
      );
    });

    return threads;
  }, [chatStore.chatThreads, chatStore.chatThreads?.length]);

  return (
    <>
      <h1>Electric Meatball</h1>
      <div className="thread_buttons_container">
        <button title="New Chat Thread" onClick={createNewThread}><AddCommentOutlinedIcon/></button>
      </div>
      <div className="thread_container">
        {renderChatThreads}
      </div>
    </>
  );
};

export default observer(ChatThreadList);