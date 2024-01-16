import { Web3Dependencies } from "@_types/hook";
import { Web3Hooks, setupHooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

export type Web3State = {
  isLoading: boolean; // true while loading web3State
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({isLoading: true} as any)
  }
}
export const createWeb3State = ({
  ethereum, provider, contract, isLoading
}: Web3Dependencies & {isLoading: boolean}) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ethereum, provider, contract, isLoading})
  }
}
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID

export const loadContract =async (name:string, provider: providers.Web3Provider): Promise<Contract> => {
  // debugger
  // console.log("111", NETWORK_ID)
     if(!NETWORK_ID){
      return Promise.reject("NETWORK_ID not defined")
     }
     try {
      // debugger
      const res = await fetch(`/contracts/${name}.json`)
      //artifact truffle 
      const artifact = await res.json()
      // console.log("1", name)
      const artifactAddres = artifact.networks[NETWORK_ID].address
      if(artifactAddres){
        // debugger
       const contract = new ethers.Contract(artifactAddres, artifact.abi, provider)
       return contract
      } else {
       return Promise.reject(`contract ${name} cnt be loaded`)
      }
     } catch (error) {
       return Promise.reject(`ERR contract ${name} cnt be loaded, ${error}`)
     }
    
}