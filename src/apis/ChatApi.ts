import axios from "axios";

export default class ChatApi {
  public static async sendChat(chatPrompt: string): Promise<string | null> {
    try {
      let response = await axios.post("http://localhost:3042/api/gemini/chat", {prompt: chatPrompt});

      if(response.status === 201) {
        console.log(response.data);
      }
      else {
        throw new Error (`That didn't work like it should... ${response.status}`);
      }
      return "floob";
    }
    catch (error: any) {
      console.log(`$$$ ERROR sendChat: ${error.message}`)
      return null;
    }
  }
}