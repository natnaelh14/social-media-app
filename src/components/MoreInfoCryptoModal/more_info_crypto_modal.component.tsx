import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    coinName: string,
    coinDescription: string,
    coinWhitePaper: string,
    coinStructure: string,
    coinProof: string,
    coinImage: string,
    coinMarketCap: number,
    coinMarketCapRank: number,
    coinCurrentPrice: number,
    coinSymbol: string,
    coinRank: number,
    coinAllTime: number,
    coinSupply: number
}

const MoreInfoCryptoModal = ({ open, handleClose, coinRank, coinAllTime, coinSupply, coinName, coinDescription, coinWhitePaper, coinStructure, coinProof, coinImage, coinMarketCap, coinMarketCapRank, coinCurrentPrice, coinSymbol }: ModalProps) => {

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: '550px' }}>
                <Box pb='0.5rem' mb='1rem' borderBottom="1px solid #ccc">
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <img width='75' height='75' src={coinImage} alt='coinImage' />
                        <Typography style={{ fontSize: '20px' }}>{coinName.toUpperCase()} - {coinSymbol.toUpperCase()}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography mb='0.75rem' textAlign='justify' style={{ fontSize: '15px' }}><b>Description:</b> {coinDescription}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>White Paper:</b> <a target="_blank" style={{ textDecoration: 'none' }} href={coinWhitePaper}>{coinWhitePaper}</a></Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>Coin Structure:</b> {coinStructure}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>Coin Proof:</b> {coinProof}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>Coin Ranking:</b> ${coinRank.toLocaleString()}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>Market Cap:</b> ${coinMarketCap.toLocaleString()}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>Current Price:</b> ${coinCurrentPrice.toLocaleString()}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>All Time High:</b> ${coinAllTime.toLocaleString()}</Typography>
                    <Typography mb='0.75rem' sx={{ fontSize: '15px' }}><b>Circulating Supply:</b> {coinSupply.toLocaleString()}</Typography>
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
                    onClick={handleClose}
                >
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MoreInfoCryptoModal;
