import type { Config } from "src/configs/base";
import { Explorer, baseConfig, chooseUrl } from "src/configs/base";

const rskFallback = import.meta.env.VITE_RSK_FALLBACK_ENDPOINT;

const rskRpcUrls = ["https://public-node.rsk.co"];
if (rskFallback) {
    rskRpcUrls.push(rskFallback);
}

const boltzApiUrl = import.meta.env.VITE_BOLTZ_API_URL;

const config = {
    ...baseConfig,
    torUrl: "http://boltzzzbnus4m7mta3cxmflnps4fp7dueu2tgurstbvrbt6xswzcocyd.onion/",
    network: "mainnet",
    loglevel: "debug",
    apiUrl: {
        normal: boltzApiUrl,
        tor: "http://boltzzzbnus4m7mta3cxmflnps4fp7dueu2tgurstbvrbt6xswzcocyd.onion/api",
    },
    assets: {
        BTC: {
            blockExplorerUrl: {
                id: Explorer.Mempool,
                normal: "https://mempool.space",
                tor: "http://mempoolhqx4isw62xs7abwphsq7ldayuidyx2v2oethdhhj6mlo2r6ad.onion",
            },
            blockExplorerApis: [
                {
                    id: Explorer.Esplora,
                    normal: "https://blockstream.info/api",
                    tor: "http://explorerzydxu5ecjrkwceayqybizmpjjznk5izmitf2modhcusuqlid.onion/api",
                },
                {
                    id: Explorer.Mempool,
                    normal: "https://mempool.space/api",
                    tor: "http://mempoolhqx4isw62xs7abwphsq7ldayuidyx2v2oethdhhj6mlo2r6ad.onion/api",
                },
            ],
        },
        "L-BTC": {
            blockExplorerUrl: {
                id: Explorer.Esplora,
                normal: "https://blockstream.info/liquid",
                tor: "http://explorerzydxu5ecjrkwceayqybizmpjjznk5izmitf2modhcusuqlid.onion/liquid",
            },
            blockExplorerApis: [
                {
                    id: Explorer.Esplora,
                    normal: "https://blockstream.info/liquid/api",
                    tor: "http://explorerzydxu5ecjrkwceayqybizmpjjznk5izmitf2modhcusuqlid.onion/liquid/api",
                },
                {
                    id: Explorer.Mempool,
                    normal: "https://liquid.network/api",
                    tor: "http://liquidmom47f6s3m53ebfxn47p76a6tlnxib3wp6deux7wuzotdr6cyd.onion/api",
                },
            ],
        },
        RBTC: {
            blockExplorerUrl: {
                id: Explorer.Blockscout,
                normal: "https://rootstock.blockscout.com",
            },
            network: {
                chainName: "Rootstock",
                chainId: 30,
                rpcUrls: rskRpcUrls,
                nativeCurrency: {
                    name: "RBTC",
                    symbol: "RBTC",
                    decimals: 18,
                },
            },
            rifRelay: "https://boltz.mainnet.relay.rifcomputing.net",
            logScanRpcUrl: import.meta.env.VITE_RSK_LOG_SCAN_ENDPOINT,
            contracts: {
                deployHeight: 6747215,
                smartWalletFactory:
                    "0x44944a80861120B58cc48B066d57cDAf5eC213dd",
                deployVerifier: "0xc0F5bEF6b20Be41174F826684c663a8635c6A081",
                swapCodeHashes: [
                    "0x4d6894da95269c76528b81c6d25425a2f6bba70156cfaf7725064f919647d955",
                    "0x8fda06a72295779e211ad2dc1bcf3f9904d23fa617f42fe0c5fc1e89b17c1777",
                ],
            },
        },
        cBTC: {
            blockExplorerUrl: {
                id: Explorer.Blockscout,
                normal: "https://testnet.citreascan.com",
            },
            network: {
                chainName: "Citrea Testnet",
                chainId: 5115,
                rpcUrls: ["https://rpc.testnet.citreascan.com"],
                nativeCurrency: {
                    name: "cBTC",
                    symbol: "cBTC",
                    decimals: 18,
                },
            },
            logScanRpcUrl: import.meta.env.VITE_CITREA_LOG_SCAN_ENDPOINT,
            contracts: {
                deployHeight: 18285383,
                swapCodeHashes: [
                    "0x03d96e1c37fe6055378dd426b7f71cdfe0df98a19d76f2413822ca27708571ab",
                    "0xbb3dd1fc3df376db40bf17dafbe3d9a596bbfeee0fa35a8b2cee4a0be342d042",
                ],
            },
        },
    },
} as Config;

export { config, chooseUrl };
