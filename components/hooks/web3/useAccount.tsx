 import { AccountHookFactory  } from "@_types/hook";
import useSWR from "swr";

//deps -> web3state
 export const hookFactory: AccountHookFactory = (deps ) => (params) => {
     const swrRes = useSWR('web3/useAccount', () => {
        console.log(deps)
        console.log(params)

        return "tes user"
     })
     return swrRes
 }

 export const useAccount = hookFactory({
    ethereum: undefined,
    provider: undefined 
 })