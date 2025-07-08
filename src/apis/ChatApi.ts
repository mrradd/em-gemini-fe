import axios from "axios";
import type ChatResponseDto from "../dtos/ChatResponseDto";
import type GetAllChatsResponseDto from "../dtos/GetAllChatsResponseDto";
import type CreateChatThreadResponseDto from "../dtos/CreateChatThreadResponseDto";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";

export default class ChatApi {

  /**
   * Create a new Chat Thread.
   * @returns new Chat Thread object, or null on failure.
   */
  public static async createNewChatThread(): Promise<ChatThreadResponseDto | null> {
    try {
      let response = await axios.post<CreateChatThreadResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat/thread/new`);

      if(response?.status !== 201) {
        throw new Error (`Failed to create the Chat Thread... ${response.status}`);
      }

      return response.data.chatThread;
    }
    catch (error: any) {
      console.log(`$$$ ERROR createNewChatThread: ${error.message}`);
      return null;
    }
  }

  /**
   * Gets all chats from the database.
   * @returns 
   */
  public static async getAllChats(): Promise<GetAllChatsResponseDto | null> {
    try {
      let response = await axios.get<GetAllChatsResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat/all`);

      if(response.status !== 200) {
        throw new Error (`Failed to get the chats... ${response.status}`);
      }

      return response.data;
    }
    catch (error: any) {
      console.log(`$$$ ERROR getAllChats: ${error.message}`);
      return null;
    }
  }

  /**
   * Sends a request for a chat with the given prompt.
   * @param chatPrompt - User prompt.
   * @returns ChatReponseDto on sucess or null otherwise.
   */
  public static async sendChat(chatPrompt: string): Promise<ChatResponseDto | null> {
    try {
      let response = await axios.post<ChatResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat`, {prompt: chatPrompt});

      if(response.status !== 201) {
        throw new Error (`Failed to send the chat... ${response.status}`);
      }

      return response.data;
    }
    catch (error: any) {
      console.log(`$$$ ERROR sendChat: ${error.message}`);
      return null;
    }
  }
}