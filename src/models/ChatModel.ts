import type ChatResponseDto from "../dtos/ChatResponseDto";

export default interface ChatModel {
  id: string; //UUID
  chatThreadId: string //UUID
  response: string;
  prompt: string;
}

export const dtoToChatModel = (chat: ChatResponseDto) => {
  return {
    id: chat.id,
    chatThreadId: chat.chat_thread_id,
    response: chat.response,
    prompt: chat.prompt,
  } as ChatModel;
}
