import { observer } from "mobx-react"
import { UseGlobalStores } from "../stores/UseGlobalStores";
import type ChatThreadDto from "../dtos/ChatThreadDto";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditChatThreadModal from "./EditChatThreadModal";
import { useState } from "react";

interface ChatThreadCardProps {
  threadTitle: string;
  threadCreatedDate: string;
  threadId: string;
}

const ChatThreadCard = ({
  threadTitle,
  threadCreatedDate,
  threadId,
}: ChatThreadCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const {chatStore} = UseGlobalStores();

  const cancelAction = () => {
    console.log("$$$ cancel pressed.");
    setShowEditModal(false);
  };

  const deleteThread = async (threadId: string) => {
    const result:boolean = await chatStore.deleteChatThread(threadId);

    if(result) {
      chatStore.removeChatThread(threadId);
    }
  };

  const editThreadDetails = async (threadId: string) => {
    console.log(`$$$ clicked editThreadDetails ${threadId}`);
    setShowEditModal(true);
  };

  const submitAction = () => {
    console.log("$$$ Submit pressed.");
    setShowEditModal(false);
  };

  const viewThread = async (threadId: string) => {
    const thread: ChatThreadDto | null = await chatStore.getChatThread(threadId);

    if(!thread) {
      alert("There was an issue getting the thread.");
    }
    console.log(thread);
    chatStore.setWorkingChatThreadFromDto(thread!);
  };

  return (
    <div className="thread_item">
      <EditChatThreadModal isVisible={showEditModal} threadName={threadTitle} submitAction={submitAction} cancelAction={cancelAction}/>
      <div>{threadTitle} - {threadCreatedDate}</div>
      <button title="Edit Thread" onClick={() => editThreadDetails(threadId)}><EditNoteOutlinedIcon/></button>
      <button title="Delete Thread Forever" onClick={() => deleteThread(threadId)}><DeleteForeverOutlinedIcon/></button>
      <button title="View Thread" onClick={() => viewThread(threadId)}><VisibilityOutlinedIcon/></button>
    </div>
  );
}

export default observer(ChatThreadCard);