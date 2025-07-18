import type ChatDto from "./ChatDto";

export default interface ChatThreadDto {
  id: string;
  title: string;
  created_date: string;
  updated_date: string;

  chats: ChatDto[];
}
