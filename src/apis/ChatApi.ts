import axios from "axios";
import type ChatResponseDto from "../dtos/ChatResponseDto";
import type GetAllChatsResponseDto from "../dtos/GetAllChatsResponseDto";
import type CreateChatThreadResponseDto from "../dtos/CreateChatThreadResponseDto";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";
import type GetAllChatThreadsResponseDto from "../dtos/GetAllChatThreadsResponseDto";
import type GetChatThreadResponseDto from "../dtos/GetChatThreadResponseDto";
import type GetChatResponseDto from "../dtos/GetChatResponseDto";

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
   * Gets all data for a single chat thread.
   * @param chatThreadId - ID of the chat thread to find.
   * @returns 
   */
  public static async getChatThreadData(chatThreadId: string): Promise<ChatThreadResponseDto | null> {
    try {
      let response = await axios.get<GetChatThreadResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat/thread/${chatThreadId}`);
      
      if(response.status !== 200) {
        throw new Error (`Failed to get the chat thread... ${response.status}`);
      }

      return response.data.thread;
    }
    catch (error: any) {
      console.log(`$$$ ERROR getChatThreadData: ${error.message}`);
      return null;
    }
  }

  /**
   * Gets all chat threads from the database.
   * @returns 
   */
  public static async getAllChatThreads(): Promise<GetAllChatThreadsResponseDto | null> {
    try {
      let response = await axios.get<GetAllChatThreadsResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat/thread/all`);

      console.log(response);
      if(response.status !== 200) {
        throw new Error (`Failed to get the chat threads... ${response.status}`);
      }

      return response.data;
    }
    catch (error: any) {
      console.log(`$$$ ERROR getAllChatThreads: ${error.message}`);
      return null;
    }
  }

  /**
   * Sends a request for a chat with the given prompt.
   * @param chatPrompt - User prompt.
   * @param chatThread - ID of the chat thread this chat belongs to.
   * @returns ChatReponseDto on sucess or null otherwise.
   */
  public static async sendChat(chatPrompt: string, chatThreadId: string): Promise<ChatResponseDto | null> {
    try {
      let response = await axios.post<GetChatResponseDto>(`${import.meta.env.VITE_BASE_URL}/gemini/chat`, {prompt: chatPrompt, chatThreadId: chatThreadId});

      if(response.status !== 201) {
        throw new Error (`Failed to send the chat... ${response.status}`);
      }

      return response.data.chat;
    }
    catch (error: any) {
      console.log(`$$$ ERROR sendChat: ${error.message}`);
      return null;
    }
  }
}