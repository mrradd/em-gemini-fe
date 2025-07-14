import { observer } from "mobx-react"
import Markdown from "react-markdown";
import { ChatRole } from "../models/ChatRole";

export interface ChatCardProps {
  text: string;
  chatRole: string
}

const ChatCard = ({text, chatRole}: ChatCardProps) => {
  return (
    <>
      <div className={`chat_card ${chatRole === ChatRole.user ? "chat_user" : "chat_system"}`}>
        <b>{chatRole === ChatRole.user ? "You\n" : "Electric Meatball\n"}</b>
        <Markdown>{text}</Markdown>
      </div>
    </>
  );
};

export default observer(ChatCard);