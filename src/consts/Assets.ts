export const LN = "LN";
export const BTC = "BTC";
export const LBTC = "L-BTC";
export const RBTC = "RBTC";
export const CBTC = "cBTC";

export type AssetType = typeof LN | typeof BTC | typeof LBTC | typeof RBTC | typeof CBTC;
export type EvmAssetType = typeof RBTC | typeof CBTC;
export type RefundableAssetType = typeof BTC | typeof LBTC;

export const assets = [LN, BTC, LBTC, RBTC, CBTC];

// RBTC and cBTC are not refundable because their keys come from the user's wallet
export const refundableAssets = [BTC, LBTC];


// EVM
export const evmAssets: EvmAssetType[] = [RBTC, CBTC];
export const isEvmAsset = (asset: string): boolean => evmAssets.includes(asset as EvmAssetType);

export const assetToChainKey: Record<string, string> = {
    RBTC: "rsk",
    cBTC: "citrea",
};