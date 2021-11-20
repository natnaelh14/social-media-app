import React from 'react';
import Carousel from 'react-material-ui-carousel';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CryptoCurrency from '../components/Cryprocurrency/cryptocurrency.component';
import { Grid, Typography, Fade, Button } from "@mui/material";
import { Box } from "@mui/system";
import TwitterPost from '../components/TwitterPost/twitter_post.component';
import CryptoDoughnut from '../components/CryptoDoughnut/crypto_doughnut.component';

const CryptoPage = () => {
    return (
        <div style={{ width: '66%', margin: '50px', boxSizing: 'border-box' }}>
            <Fade in={true} timeout={1000}>
                <Box>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Box width="40vh" height="auto">
                            <Grid item padding="1rem 1rem 1rem 1rem" border="5px solid #ccc">
                                <Carousel
                                    fullHeightHover={false}
                                    NextIcon={<SkipNextIcon />}
                                    PrevIcon={<SkipPreviousIcon />}
                                >
                                    <CryptoCurrency name='bitcoin' />
                                    <CryptoCurrency name='ethereum' />
                                    <CryptoCurrency name='ripple' />
                                </Carousel>
                            </Grid>
                        </Box>
                        <CryptoDoughnut />
                    </div>
                    <Box textAlign="right" padding="10px 20px">
                        <Button
                            size="small"
                            sx={{
                                textTransform: "capitalize",
                                padding: "6px 20px",
                                background: "black",
                                "&:hover": {
                                    background: "#333",
                                },
                            }}
                            variant="contained"

                        >
                            Add/Modify Crypto
                        </Button>
                    </Box>
                    <Box borderBottom="1px solid #ccc">
                        <Typography
                            display="inline-block"
                            variant="caption"
                            fontSize="20px"
                            marginX="1rem"
                            padding="6px 0"
                            fontWeight="500"
                            borderBottom={`4px solid black`}
                        >
                            Twitter Feed
                        </Typography>
                    </Box>
                    <Box height="90vh" sx={{ overflowY: "scroll" }}>
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                        <TwitterPost />
                    </Box>
                </Box>
            </Fade>
        </div>


    )
}

export default CryptoPage;
