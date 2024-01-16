import { createContext, FC, FunctionComponent, useContext, useEffect, useState } from "react"
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers  } from "ethers";
import { setupHooks } from "@hooks/web3/setupHooks";

//context 
const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FC<any> = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const contract =  await loadContract("NftMarket", provider);

        setWeb3Api(createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract,
          isLoading: false
        }))
      } catch(e: any) {
        console.error("Please, install web3 wallet");
        setWeb3Api((prevApiRes) => createWeb3State({
          ...prevApiRes as any,
          isLoading: false,
        }))
      }
    }

    initWeb3();
  }, [])

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

//get state data
export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;