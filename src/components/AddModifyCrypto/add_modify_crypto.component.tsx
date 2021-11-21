import { Grid, Input } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, Dialog, DialogActions, DialogContent, Autocomplete, DialogTitle, IconButton, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { coinsList } from './coin';
import { QUERY_CRYPTOS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

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


    const [cryptoData, setCryptoData] = useState([]);

    const handleCrypto = () => {
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
                            return cryptoArray.push([res[0].name, res[0].current_price * cryptoByUserId[i].holding_amount])
                        })
                    // .then((res) => {
                    //     setCryptoData(cryptoArray)
                    // })
                }
                // setCryptoData(cryptoArray)
                console.log('micheal', cryptoArray)
            })()
        }
    }, [cryptoArray])

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
                            sx={{ marginBottom: '30px' }}
                            options={coinsList.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Crypto"
                                    variant='standard'
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                        <FormControl sx={{ m: 1 }}>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value=''
                                onChange={() => console.log('hello')}
                                startAdornment={<InputAdornment position="start">#</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                        <Button variant="contained">ADD</Button>
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
