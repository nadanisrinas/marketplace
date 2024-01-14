import { setupHooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null;
  provider: providers.Web3Provider | null;
  contract: Contract | null;
}

export type Web3State = {
  isLoading: boolean; // true while loading web3State
} & Web3Params

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({} as any)
  }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID

export const loadContract =async (name:string, provider: providers.Web3Provider): Promise<Contract> => {
  // debugger
  console.log("111", NETWORK_ID)
     if(!NETWORK_ID){
      return Promise.reject("NETWORK_ID not defined")
     }
     try {
      // debugger
      const res = await fetch(`/contracts/${name}.json`)
      //artifact truffle 
      const artifact = await res.json()
      console.log("1", name)
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