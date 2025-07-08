import type ChatModel from "../models/ChatModel";

export default interface ChatThreadResponseDto {
  id: string;
  title: string;
  chats: ChatModel[];
  created_date: string;
  updated_date: string;
}
