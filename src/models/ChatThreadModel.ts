import type ChatThreadDto from "../dtos/ChatThreadDto";
import type ChatModel from "./ChatModel";
import { dtoToChatModel } from "./ChatModel";

export default interface ChatThreadModel {
  id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  chats: ChatModel[];
}

export const dtoToChatThreadModel = ({id, title, created_date, updated_date, chats}: ChatThreadDto): ChatThreadModel => {

  const chatModels: ChatModel[] = [];
  chats?.forEach((chatDto) => {
    chatModels.push(dtoToChatModel(chatDto));
  });

  return {
    id: id,
    title: title,
    createdDate: created_date,
    updatedDate: updated_date,
    chats: chatModels,
  } as ChatThreadModel;
};