import { observer } from "mobx-react"
import Markdown from "react-markdown";
import { ChatRole } from "../models/ChatRole";

export interface ChatCardProps {
  text: string;
  chatType: string
}

const ChatCard = ({text, chatType}: ChatCardProps) => {
  return (
    <>
      <div className="chat_card">
        {chatType === ChatRole.user ? "User:\n" : "EM:\n"}
        <Markdown>{text}</Markdown>
      </div>
    </>
  );
};

export default observer(ChatCard);