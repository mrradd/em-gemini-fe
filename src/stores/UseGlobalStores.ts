import ChatBoxStore from "./ChatBoxStore";
import ChatStore from "./ChatStore";

const globalStores = {
  chatBoxStore: new ChatBoxStore(),
  chatStore: new ChatStore(),
};

export const UseGlobalStores = () => {
  return {
    ...globalStores,
  };
};