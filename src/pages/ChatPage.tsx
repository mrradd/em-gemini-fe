import "../styles/ChatPage.css"
import { observer } from "mobx-react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";
import ChatThreadList from "../components/ChatThreadList";

const ChatPage = () => {

  return (
    <div className="chat_page_container">
      <div className="chat_thread_content">
        <ChatThreadList/>
      </div>
      <div className="chat_content">
        <ChatList/>
      </div>
      <div className="chat_box_content">
        <ChatBox/>
      </div>
    </div>
  );
}

export default observer(ChatPage);