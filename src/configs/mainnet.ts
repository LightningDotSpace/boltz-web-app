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
        },
    },
} as Config;

export { config, chooseUrl };
