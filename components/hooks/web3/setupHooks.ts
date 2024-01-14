import { hookFactory as createAccountHook } from "./useAccount";
import { UseAccountHook, Web3Dependencies } from "@_types/hook";

export type Web3Hooks = {
  useAccount: UseAccountHook;
}

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps)
  }
}