export default interface ChatModel {
  role: string; //'user' or 'system'. If it's not from a user, it's always system.
  text: string;
}