import { Show } from "solid-js";

import ContractTransaction from "../components/ContractTransaction";
import LoadingSpinner from "../components/LoadingSpinner";
import { evmAssets } from "../consts/Assets";
import { SwapType } from "../consts/Enums";
import { useGlobalContext } from "../context/Global";
import { usePayContext } from "../context/Pay";
import { useWeb3Signer } from "../context/Web3";
import { relayClaimTransaction } from "../rif/Signer";
import { prefix0x, satoshiToWei } from "../utils/rootstock";
import type { ChainSwap, ReverseSwap } from "../utils/swapCreator";

// TODO: use bignumber for amounts
const ClaimEvm = (props: {
    amount: number;
    swapId: string;
    useRif: boolean;
    preimage: string;
    assetReceive: string;
    signerAddress: string;
    refundAddress: string;
    derivationPath: string;
    timeoutBlockHeight: number;
}) => {
    const { getEtherSwap, signer } = useWeb3Signer();
    const { t, getSwap, setSwapStorage } = useGlobalContext();
    const { setSwap } = usePayContext();

    return (
        <ContractTransaction
            asset={props.assetReceive}
            /* eslint-disable-next-line solid/reactivity */
            onClick={async () => {
                // Ensure network is ready before claiming
                await signer().provider.getNetwork();

                let transactionHash: string;

                // Pass the asset to getEtherSwap to ensure correct contracts
                const etherSwap = getEtherSwap(props.assetReceive);

                if (props.useRif) {
                    transactionHash = await relayClaimTransaction(
                        signer(),
                        etherSwap,
                        props.preimage,
                        props.amount,
                        props.refundAddress,
                        props.timeoutBlockHeight,
                    );
                } else {
                    transactionHash = (
                        await etherSwap[
                            "claim(bytes32,uint256,address,uint256)"
                        ](
                            prefix0x(props.preimage),
                            satoshiToWei(props.amount),
                            props.refundAddress,
                            props.timeoutBlockHeight,
                        )
                    ).hash;
                }

                const currentSwap = await getSwap(props.swapId);
                currentSwap.claimTx = transactionHash;
                setSwap(currentSwap);
                await setSwapStorage(currentSwap);
            }}
            address={{
                address: props.signerAddress,
                derivationPath: props.derivationPath,
            }}
            buttonText={t("continue")}
            promptText={t("transaction_prompt_receive", {
                button: t("continue"),
                asset: props.assetReceive,
            })}
            waitingText={t("tx_ready_to_claim")}
        />
    );
};

const TransactionConfirmed = () => {
    const { t } = useGlobalContext();
    const { swap } = usePayContext();

    const chain = swap() as ChainSwap;
    const reverse = swap() as ReverseSwap;

    return (
        <Show
            when={evmAssets.includes(swap().assetReceive)}
            fallback={
                <div>
                    <h2>{t("tx_confirmed")}</h2>
                    <p>{t("tx_ready_to_claim")}</p>
                    <LoadingSpinner />
                </div>
            }>
            <Show
                when={swap().type !== SwapType.Chain}
                fallback={
                    <ClaimEvm
                        swapId={chain.id}
                        useRif={chain.useRif}
                        preimage={chain.preimage}
                        signerAddress={chain.signer}
                        amount={chain.claimDetails.amount}
                        derivationPath={chain.derivationPath}
                        refundAddress={chain.claimDetails.refundAddress}
                        timeoutBlockHeight={
                            chain.claimDetails.timeoutBlockHeight
                        }
                        assetReceive={chain.assetReceive}
                    />
                }>
                <ClaimEvm
                    swapId={reverse.id}
                    useRif={reverse.useRif}
                    preimage={reverse.preimage}
                    amount={reverse.onchainAmount}
                    signerAddress={reverse.signer}
                    refundAddress={reverse.refundAddress}
                    derivationPath={reverse.derivationPath}
                    timeoutBlockHeight={reverse.timeoutBlockHeight}
                    assetReceive={reverse.assetReceive}
                />
            </Show>
        </Show>
    );
};

export default TransactionConfirmed;
