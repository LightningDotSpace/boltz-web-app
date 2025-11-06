export const LN = "LN";
export const BTC = "BTC";
export const LBTC = "L-BTC";
export const RBTC = "RBTC";
export const cBTC = "cBTC";

export type AssetType = typeof LN | typeof BTC | typeof LBTC | typeof RBTC | typeof cBTC;
export type RefundableAssetType = typeof BTC | typeof LBTC;

export const assets = [LN, BTC, LBTC, RBTC, cBTC];

// EVM-compatible assets (used for Web3 wallet connections)
export const evmAssets = [RBTC, cBTC];

// RBTC and cBTC are not refundable because their keys come from the user's wallet
export const refundableAssets = [BTC, LBTC];
