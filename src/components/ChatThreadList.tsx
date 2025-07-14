import { observer } from "mobx-react";
import { UseGlobalStores } from "../stores/UseGlobalStores";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";
import type ChatThreadModel from "../models/ChatThreadModel";
import { useEffect, useMemo, useRef } from "react";
import type GetAllChatThreadsResponseDto from "../dtos/GetAllChatThreadsResponseDto";
import { dtoToChatThreadModel } from "../models/ChatThreadModel";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

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

  const deleteThread = async (threadId: string) => {
    const result:boolean = await chatStore.deleteChatThread(threadId);

    if(result) {
      chatStore.removeChatThread(threadId);
    }
  };

  const editThreadDetails = async (threadId: string) => {
    console.log(`$$$ clicked editThreadDetails ${threadId}`);
  };

  const viewThread = async (threadId: string) => {
    const thread: ChatThreadResponseDto | null = await chatStore.getChatThread(threadId);

    if(!thread) {
      alert("There was an issue getting the thread.");
    }
    console.log(thread);
    chatStore.setWorkingChatThread(thread!);
  };

  const renderChatThreads = useMemo(() => {
    const threads = chatStore.chatThreads.map((thread, index) => {
      return (
        <div key={index} className="thread_item"> 
          <div>{thread.title} - {thread.createdDate}</div>
          <button title="Edit Thread" onClick={() => editThreadDetails(thread.id)}><EditNoteOutlinedIcon/></button>
          <button title="Delete Thread Forever" onClick={() => deleteThread(thread.id)}><DeleteForeverOutlinedIcon/></button>
          <button title="View Thread" onClick={() => viewThread(thread.id)}><VisibilityOutlinedIcon/></button>
        </div>
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