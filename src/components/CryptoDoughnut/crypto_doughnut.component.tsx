import React, { useEffect, useState } from 'react';
import PieChart, { Legend, Series, Tooltip, Format, Label, Connector, Title, Subtitle, Size } from 'devextreme-react/pie-chart';

const CryptoDoughnut = () => {

    const currencyList = [
        {
            coin: 'ethereum',
            total: 10
        },
        {
            coin: 'bitcoin',
            total: 2
        },
        {
            coin: 'ripple',
            total: 100000
        }];
    

    const [cryptoData, setCryptoData] =useState();
    const [cryptoTotal, setCryptoTotal] = useState(0);

    const customizeTooltip = (arg: any) => {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    useEffect(() => {
        (async () => {
            let cryptoArray: any = []
            let total = 0
            for (let i = 0; i < currencyList.length; i++) {
                await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currencyList[i].coin}`)
                    .then((res: any) => {
                        return res.json()
                    })
                    .then((res) => {
                        cryptoArray.push({ region: res[0].name, val: res[0].current_price * currencyList[i].total })
                        total += res[0].current_price * currencyList[i].total
                    })
            }
            setCryptoData(cryptoArray)
            setCryptoTotal(total)
        })()
    }, [])

    return (
        <>
            <PieChart
                id="pie"
                type="doughnut"
                palette="Soft Pastel"
                dataSource={cryptoData}
                // style={{width: "700px", height: "400px"}}
            >
                <Title text="CRYPTO HOLDING">
                    <Subtitle text={`US$ ${cryptoTotal.toLocaleString()}`} />
                </Title>
                <Series argumentField="region">
                    <Label visible={true} format="currency">
                        <Connector visible={true} />
                    </Label>
                </Series>
                <Size width={500} />
                <Legend
                    margin={0}
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    itemTextPosition="right"
                />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                    <Format type="currency" />
                </Tooltip>
            </PieChart>
        </>
    )
}

export default CryptoDoughnut
