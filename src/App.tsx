import './App.css'
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <>
      <div className="top_content">
        <h1>Electric Meatball Gemini</h1>
      </div>
      <div className="main_content">
        <ChatPage/>
      </div>
      <div className="bottom_content">
        <h5>Powered by The Senator</h5>
      </div>
    </>
  );
}

export default App
