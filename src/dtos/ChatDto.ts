export default interface ChatDto {
  id: string; //UUID
  chat_thread_id: string //UUID
  response: string;
  prompt: string;
}
