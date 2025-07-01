import ChatBoxStore from "./ChatBoxStore";

const globalStores = {
  chatBoxStore: new ChatBoxStore(),
};

export const UseGlobalStores = () => {
  return {
    ...globalStores,
  };
};