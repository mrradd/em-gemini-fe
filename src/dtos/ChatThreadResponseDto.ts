import type ChatModel from "../models/ChatModel";

export default interface ChatThreadResponseDto {
  id: string;
  title: string;
  created_date: string;
  updated_date: string;

  chats: ChatModel[];
}
