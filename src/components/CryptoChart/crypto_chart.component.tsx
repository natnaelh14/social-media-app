import React from 'react';


type cryptoProps = {
  coinName: string,
  coinImage: string,
  coinRank: string,
  coinMarketCap: string,
  coinCurrentPrice: string,
  coinATH: string

}
const CryptoChart = ({ coinName, coinImage, coinRank, coinMarketCap, coinCurrentPrice, coinATH }: cryptoProps) => (
  <>
    <div className='header'>
      <h1 className='title'>{coinName} <img height='50px' width='50px' src={coinImage} /></h1>
      <p>Market Cap: ${coinMarketCap.toLocaleString()}</p>
      <p>Current Price: ${coinCurrentPrice.toLocaleString()}</p>
      <p>Coin All Time High: ${coinATH.toLocaleString()}</p>
      <p>Coin Rank: {coinRank}</p>
    </div>
  </>
);

export default CryptoChart;