import axios from "axios";
import type ChatResponseDto from "../dtos/ChatResponseDto";

export default class ChatApi {
  public static async sendChat(chatPrompt: string): Promise<ChatResponseDto | null> {
    try {
      let response = await axios.post<ChatResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat`, {prompt: chatPrompt});

      if(response.status === 201) {
        console.log(response.data);
      }
      else {
        throw new Error (`That didn't work like it should... ${response.status}`);
      }

      return response.data;
    }
    catch (error: any) {
      console.log(`$$$ ERROR sendChat: ${error.message}`)
      return null;
    }
  }
}