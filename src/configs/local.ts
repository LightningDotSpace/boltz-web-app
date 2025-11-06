import type { Config } from "src/configs/base";
import { Explorer, baseConfig, chooseUrl } from "src/configs/base";

const config = {
    ...baseConfig,
    network: "mainnet",
    loglevel: "debug",
    apiUrl: {
        // Local backend on port 9001
        normal: "http://localhost:9001",
    },
    assets: {
        BTC: {
            blockExplorerUrl: {
                id: Explorer.Mempool,
                normal: "https://mempool.space",
            },
            blockExplorerApis: [
                {
                    id: Explorer.Mempool,
                    normal: "https://mempool.space/api",
                },
            ],
        },
        RBTC: {
            blockExplorerUrl: {
                id: Explorer.Blockscout,
                normal: "https://rootstock.blockscout.com",
            },
            network: {
                chainName: "RSK Mainnet",
                chainId: 30,
                rpcUrls: ["https://public-node.rsk.co"],
                nativeCurrency: {
                    name: "RBTC",
                    symbol: "RBTC",
                    decimals: 18,
                },
            },
        },
        cBTC: {
            blockExplorerUrl: {
                id: Explorer.Blockscout,
                normal: "https://explorer.testnet.citrea.xyz",
            },
            network: {
                chainName: "Citrea Testnet",
                chainId: 5115,
                rpcUrls: ["https://rpc.testnet.citrea.xyz"],
                nativeCurrency: {
                    name: "cBTC",
                    symbol: "cBTC",
                    decimals: 18,
                },
            },
            // No RIF Relay support for Citrea (Rootstock-only feature)
            contracts: {
                deployHeight: 0,
            },
        },
    },
} as Config;

export { config, chooseUrl };
