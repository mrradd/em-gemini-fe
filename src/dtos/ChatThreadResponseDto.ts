import type ChatResponseDto from "./ChatResponseDto";

export default interface ChatThreadResponseDto {
  id: string;
  title: string;
  created_date: string;
  updated_date: string;

  chats: ChatResponseDto[];
}
