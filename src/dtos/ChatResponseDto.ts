export default interface ChatResponseDto {
  id: string; //UUID
  chat_thread_id: string //UUID
  response: string;
  prompt: string;
}
