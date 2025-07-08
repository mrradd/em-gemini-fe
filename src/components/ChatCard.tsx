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
      <div className="chat_card">
        {chatRole === ChatRole.user ? "User:\n" : "EM:\n"}
        <Markdown>{text}</Markdown>
      </div>
    </>
  );
};

export default observer(ChatCard);