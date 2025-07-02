import { observer } from "mobx-react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";

const ChatPage = () => {

  return (
    <>
      <div className="chat_content">
        <ChatList/>
      </div>
      <div className="chat_box_content">
        <ChatBox/>
      </div>
      
    </>
  );
}

export default observer(ChatPage);