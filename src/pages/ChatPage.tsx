import { observer } from "mobx-react";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {

  return (
    <>
      <div className="chat_content">
        <p>derp</p>
      </div>
      <ChatBox/>
    </>
  );
}

export default observer(ChatPage);