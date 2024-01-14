import { FunctionComponent } from "react";
import { NftItem } from '@ui'


type NftsProps = {
    nfts: any[]
}
const NftList: FunctionComponent<NftsProps> = ({ nfts }) => {
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {
                nfts.map((nft,i) =>
                    <div key={`${nft.images}-${i}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <NftItem item={nft} />
                    </div>
                )
            }
        </div>
    )
}

export default NftList