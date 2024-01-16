import { useWeb3 } from "./web3";

export { default as Web3Provider } from "./web3"
export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
  }
  