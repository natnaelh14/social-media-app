import React from 'react';
import { Typography } from "@mui/material";


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
      <Typography sx={{ fontSize: '16px' }}><b>Market Cap:</b> ${coinMarketCap.toLocaleString()}</Typography>
      <Typography sx={{ fontSize: '16px' }}><b>Current Price:</b> ${coinCurrentPrice.toLocaleString()}</Typography>
      <Typography sx={{ fontSize: '16px' }}><b>Coin All Time High:</b> ${coinATH.toLocaleString()}</Typography>
      <Typography sx={{ fontSize: '16px' }}><b>Coin Rank:</b> {coinRank}</Typography>
    </div>
  </>
);

export default CryptoChart;