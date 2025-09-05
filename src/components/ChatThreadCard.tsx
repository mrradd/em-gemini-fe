import { observer } from "mobx-react"
import { UseGlobalStores } from "../stores/UseGlobalStores";
import type ChatThreadDto from "../dtos/ChatThreadDto";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditChatThreadModal from "./EditChatThreadModal";
import { useEffect, useState } from "react";

interface ChatThreadCardProps {
  threadCreatedDate: string;
  threadId: string;
  threadTitle: string;
}

const ChatThreadCard = ({
  threadCreatedDate,
  threadId,
  threadTitle,
}: ChatThreadCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const {chatStore} = UseGlobalStores();

  useEffect(() => {
    setIsSelected(chatStore.workingChatThread.id === threadId)
  }, [chatStore.workingChatThread]);

  const cancelAction = () => {
    setShowEditModal(false);
  };

  const deleteThread = async (threadId: string) => {
    const result:boolean = await chatStore.deleteChatThread(threadId);

    if(result) {
      chatStore.removeChatThread(threadId);
    }
  };

  const editThreadDetails = () => {
    setShowEditModal(true);
  };

  const submitAction = () => {
    setShowEditModal(false);
  };

  const viewThread = async (threadId: string) => {
    const thread: ChatThreadDto | null = await chatStore.getChatThread(threadId);

    if(!thread) {
      alert("There was an issue getting the thread.");
    }

    chatStore.setWorkingChatThreadFromDto(thread!);
  };

  return (
    <div className={`thread_item ${isSelected ? "chat_thread_selected" : null}`}>
      <EditChatThreadModal isVisible={showEditModal} threadName={threadTitle} threadId={threadId} submitAction={submitAction} cancelAction={cancelAction}/>
      <div>{threadTitle} - {threadCreatedDate}</div>
      <button title="Edit Thread" onClick={() => editThreadDetails()}><EditNoteOutlinedIcon/></button>
      <button title="Delete Thread Forever" onClick={() => deleteThread(threadId)}><DeleteForeverOutlinedIcon/></button>
      <button title="View Thread" onClick={() => viewThread(threadId)}><VisibilityOutlinedIcon/></button>
    </div>
  );
}

export default observer(ChatThreadCard);