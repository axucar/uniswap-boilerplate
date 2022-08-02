import { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Token} from '@uniswap/sdk';
const chainId = ChainId.MAINNET
console.log(`The chainId of Mainnet is ${chainId}.`)
const dai_tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed
const usdc_tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // must be checksummed

import ethers from 'ethers';

//METHOD 1: Alchemy, ~500-1000ms
// const url = 'https://eth-mainnet.g.alchemy.com/v2/<YOUR-API-KEY>';
// const customProvider = new ethers.providers.JsonRpcProvider(url);

//METHOD 2: IPC (LOCAL node machine only)
// const url = '/home/<user>/.ethereum/geth.ipc';
// const customProvider = new ethers.providers.IpcProvider(url);

//METHOD 3: HTTP, ~50-100ms
const url = 'http://localhost:8545'; 
const customProvider = new ethers.providers.JsonRpcProvider(url);

var startTime = performance.now();

const init = async () => {	
	const dai = new Token(ChainId.MAINNET, dai_tokenAddress, 18, 'DAI', 'Dai stablecoin');	
	const weth = WETH[dai.chainId];
	const weth_dai_pair = await Fetcher.fetchPairData(dai, WETH[dai.chainId], customProvider); 		
	const weth_dai_route = new Route([weth_dai_pair], weth); //input is weth		
	const weth_dai_trade = new Trade(weth_dai_route, new TokenAmount(weth, String(0.1*1e18)), TradeType.EXACT_INPUT);	

	console.log("Mid Price WETH --> DAI:", weth_dai_route.midPrice.toSignificant(6));	
	console.log("Execution Price WETH --> DAI:", weth_dai_trade.executionPrice.toSignificant(6));
	console.log("Mid Price after trade WETH --> DAI:", weth_dai_trade.nextMidPrice.toSignificant(6));	
	var endTime = performance.now();
	console.log("-".repeat(45));
	console.log(`Call to Uniswap took ${endTime - startTime} milliseconds`);
}

init();




