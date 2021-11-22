import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CryptoChart from '../CryptoChart/crypto_chart.component';
import CoinGraph from '../CoinGraph/coin_graph.component';

type nameProps = {
    name: string
}

const CryptoCurrency = ({ name }: nameProps) => {

    const [coinData, setCoinData] = useState<any>();
    const [coinDateData, setCoinDateData] = useState<any>();
    const [coinPriceData, setCoinPriceData] = useState<any>();

    useEffect(() => {
        (async () => {
            await fetch('https://api.coinpaprika.com/v1/coins/btc-bitcoin')
                .then((response) => {
                    console.log(response.json())
                })
            await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=30&interval=daily`)
                .then((response) => {
                    return response.json()
                })
                .then((res) => {
                    let day = []
                    let price = []
                    for (let i = 0; i < res.prices.length; i++) {
                        day.push(res.prices[i][0]);
                        price.push(res.prices[i][1]);
                    };
                    setCoinDateData(day);
                    setCoinPriceData(price);

                })
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}`)
                .then((res: any) => {
                    return res.json()
                })
                .then((res: any) => {
                    console.log(res[0])
                    setCoinData(res[0])
                })
        })()
    }, [])

    return (
        <>
            {coinData && (
                <Box >
                    <Grid item padding="1rem 1rem 1rem 1rem" border="1px solid #ccc">
                        <CryptoChart coinName={coinData.name} coinImage={coinData.image} coinRank={coinData.market_cap_rank} coinMarketCap={coinData.market_cap} coinCurrentPrice={coinData.current_price} coinATH={coinData.ath} />
                        <CoinGraph coinDates={coinDateData} coinPrices={coinPriceData} />
                    </Grid>

                </Box>
            )}
        </>


    )
}

export default CryptoCurrency
