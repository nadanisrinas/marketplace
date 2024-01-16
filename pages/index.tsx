import { Inter } from 'next/font/google'
import { BaseLayout, NftList } from '@ui' 
import nfts from "../content/meta.json"
import { NftMeta } from '@_types/nft'
import { useWeb3 } from '@providers/web3'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { provider,ethereum, contract } = useWeb3();
  // console.log('contract1111', contract)
  const getAccounts = async () => {
    try {
      const listAccount = await provider?.listAccounts()
        // console.log("p", listAccount)
    } catch (error) {
      alert("ERROR " + error)
    }
  }

  if (provider) {
    
    getAccounts()
  }
  const getNftInfo = async () => {
    // console.log(await contract!.name());
    // console.log(await contract!.symbol());
  }

  if (contract) {
    getNftInfo();
  }
  return (
    <BaseLayout>
    {/* {`Is Loading: ${isLoading}, `}
    {`Ethereum: ${ethereum}, `}
    {`Provider: ${provider}, `}
    {`Contract: ${contract}, `} */}
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Amazing Creatures NFTs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
         <NftList
          nfts={nfts as NftMeta[]}
         />
        </div>
      </div>
    </BaseLayout>
  )
}
