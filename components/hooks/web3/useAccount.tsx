import { CryptoHookFactory } from "@_types/hook";
import { useEffect } from "react";
import useSWR from "swr";

type UseAccountResponse = {
   connect: () => void,
   isLoading: boolean,
   isInstalled: boolean
 }

export type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>
//deps -> web3state
export const hookFactory: AccountHookFactory = (deps) => () => {
   const { provider, ethereum, isLoading } = deps
   const {data, mutate,isValidating, ...swr} = useSWR(provider ? 'web3/useAccount' : null, async () => {
      //debug provider
      //  debugger 
      const accounts = await provider!.listAccounts()
      const account = accounts[0]
      if (!account) {
         throw "Cannot retreive account! Please, connect to web3 wallet."
      }

      return account
   }, {
      // https://swr.vercel.app/docs/api
      revalidateOnFocus: false,
      shouldRetryOnError: false
   })


   //   debugger
   const connect = async () => {
      try {
         ethereum?.request({ method: "eth_requestAccounts" });
      } catch (e) {
         console.error(e);
      }
   }

   useEffect(() => {
      ethereum?.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      }
    })
  
    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        console.error("Please, connect to Web3 wallet");
        //detect account changes
      } else if (accounts[0] !== data) {
        alert("accounts has changed");
         mutate(accounts[0])
        console.log(accounts[0]);
      }
    }

   return {
      ...swr,
      data,
      isLoading: isLoading as boolean,
      // || isValidating,
      isInstalled: ethereum?.isMetaMask || false,
      isValidating,
      mutate,
      connect
   };
}



export const useAccount = hookFactory({
   ethereum: undefined,
   provider: undefined
})