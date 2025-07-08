import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";
import type ChatModel from "./ChatModel";

export default interface ChatThreadModel {
  id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  chats: ChatModel[];
}

export const dtoToChatThreadModel = ({id, title, created_date, updated_date, chats}: ChatThreadResponseDto): ChatThreadModel => {
  return {
    id: id,
    title: title,
    createdDate: created_date,
    updatedDate: updated_date,
    chats: chats,
  } as ChatThreadModel;
};