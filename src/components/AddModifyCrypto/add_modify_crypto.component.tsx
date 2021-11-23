import { Grid, Input } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, Dialog, DialogActions, DialogContent, Autocomplete, DialogTitle, IconButton, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NumberFormat from 'react-number-format';
import { Box } from "@mui/system";
import { coinsList } from './coin';
import { QUERY_CRYPTOS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_CRYPTO } from '../../utils/mutations';

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    userId: string
}

const AddModifyCrypto = ({
    open,
    handleClose,
    userId
}: ModalProps) => {

    const { loading, error, data } = useQuery(QUERY_CRYPTOS, {
        variables: {
            user_id: "chG0WmOFPheLzl528legA3iIpbO2"
        },
    });
    if (data) {
        var { cryptoByUserId } = data;
    }

    const [addCrypto, { }] = useMutation(ADD_CRYPTO);
    const [addHolding, setAddHolding] = useState();
    const [addCoin, setAddCoin] = useState("")

    const [cryptoData, setCryptoData] = useState([]);

    const handleCrypto = () => {
    }

    const handleAddCrypto = async () => {
        await addCrypto({
            variables: {
                cryptoName: addCoin,
                holdingAmount: Number(addHolding),
                userId: userId
            }
        });
    }

    let cryptoArray: any = []
    useEffect(() => {
        if (cryptoByUserId) {
            (async () => {
                for (let i = 0; i < cryptoByUserId.length; i++) {
                    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoByUserId[i].crypto_name}`)
                        .then((res: any) => {
                            return res.json()
                        })
                        .then((res: any) => {
                            return [res[0].name, res[0].current_price * cryptoByUserId[i].holding_amount]
                        })
                        .then((res) => setCryptoData(prev => ({...prev, res })))
                }
                // setCryptoData(cryptoArray)
                console.log('micheal', cryptoByUserId)
            })()
        }
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography textAlign='center' style={{ fontSize: '20px' }}>ADD/MODIFY CRYPTO</Typography>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: '500px' }}>
                <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 },
                    }}>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            fullWidth
                            // sx={{ marginBottom: '30px' }}
                            options={coinsList.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Crypto"
                                    variant='standard'
                                    value={addCoin}
                                    onChange={(e) => setAddCoin(e.target.value)}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                        <NumberFormat
                            customInput={TextField}
                            onValueChange={(values: any) => setAddHolding(values.value)}
                            value={addHolding}
                            variant="standard"
                        />
                        <Button onClick={handleAddCrypto} variant="contained">ADD</Button>
                    </Box>
                    <Box borderBottom="1px solid #ccc" mb='2rem'>
                        <Typography
                            display="inline-block"
                            variant="caption"
                            fontSize="16px"
                            marginX="rem"
                            padding="6px 0"
                            fontWeight="500"
                            borderBottom={`4px solid black`}
                        >
                            Holdings
                        </Typography>
                    </Box>
                    {cryptoArray && (
                        cryptoArray.map((val: any, index: any) => {
                            <Box key={index} sx={{ marginBottom: '30px' }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& > :not(style)': { m: 1 },
                                }}>
                                    <Typography>{`${val[0]}: `}</Typography>
                                    <FormControl sx={{ m: 1 }}>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={val[1]}
                                            onChange={() => console.log('hello')}
                                            startAdornment={<InputAdornment position="start">#</InputAdornment>}
                                            label="Amount"
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        })
                    )
                    }

                </Box>

            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    size="small"
                    sx={{
                        textTransform: "capitalize",
                        padding: "6px 20px",
                        marginBottom: '20px',
                        width: "60%",
                        background: "black",
                        "&:hover": {
                            background: "#333",
                        },
                    }}
                    variant="contained"
                    onClick={handleCrypto}
                >
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddModifyCrypto;
