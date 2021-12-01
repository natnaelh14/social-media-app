import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CryptoCurrency from '../components/Cryprocurrency/cryptocurrency.component';
import { Grid, Typography, Fade, Button } from "@mui/material";
import { Box } from "@mui/system";
import CryptoDoughnut from '../components/CryptoDoughnut/crypto_doughnut.component';
import AddModifyCrypto from '../components/AddModifyCrypto/add_modify_crypto.component';
import { userProps } from '../index.types';
import { useAppSelector } from '../app/hooks';
import { useQuery } from '@apollo/client';
import { QUERY_CRYPTOS } from '../utils/queries';
import TwitterPostList from '../components/TwitterPostList/twitter_post_list.component';
import { CryptoDataContainer } from './styles/crypto_page.styles';
import { makeStyles } from '@material-ui/core/styles';

    const useStyles = makeStyles(theme => ({
        carouselFormat: {
            width: '500px',
            height: '500px'
        }
    }))

const CryptoPage = () => {

    const classes = useStyles();

    const currentUser = useAppSelector(state => state.currentUser)
    const { loading, user } = currentUser
    const userInfo: userProps = user

    const { loading: cryptoLoading, data } = useQuery(QUERY_CRYPTOS, {
        variables: {
            user_id: userInfo.id
        }
    })
    if (data) {
        var { cryptoByUserId } = data;
        // console.log('jim', cryptoByUserId.crypto_name)
    }

    // useEffect(() => {
    //     console.log('jim', cryptoByUserId)
    // }, [data])

    const [openModal, setOpenModal] = React.useState(false);

    const handleModalOpen = () => {
        setOpenModal(true);
    };
    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <div style={{ width: '75%', margin: '20px' }}>
            <Fade in={true} timeout={1000}>
                <Box sx={{ border: '1px solid #cdcdcd', padding: '20px' }} >
                    {(loading && cryptoLoading) ? (
                        <div>Crypto is Loading</div>
                    ) : (
                        <>
                            <CryptoDataContainer>
                                <Box>
                                    <Grid item padding="1rem 1rem 1rem 1rem" width='350px' height='450px' border="5px solid #ccc">
                                        <Carousel
                                            fullHeightHover={false}
                                            className='classes.carouselFormat'
                                            NextIcon={<SkipNextIcon />}
                                            PrevIcon={<SkipPreviousIcon />}
                                        >
                                            {cryptoByUserId && (
                                                cryptoByUserId.map((crypto: any) => {
                                                    return <CryptoCurrency key={crypto.id} name={crypto.crypto_name} />
                                                })
                                            )}
                                        </Carousel>
                                    </Grid>
                                </Box>
                                <Box>
                                    <CryptoDoughnut currentUser={userInfo.id} />
                                </Box>
                            </CryptoDataContainer>
                            <Box textAlign="right" padding="10px 20px">
                                <Button
                                    size="small"
                                    onClick={handleModalOpen}
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
                                <TwitterPostList cryptoName={'bitcoin'} />
                                <TwitterPostList cryptoName={'ethereum'} />
                                <TwitterPostList cryptoName={'ripple'} />
                            </Box>
                        </>
                    )}

                </Box>
            </Fade>
            {openModal && (
                <AddModifyCrypto
                    open={openModal}
                    handleClose={handleModalClose}
                    userId='chG0WmOFPheLzl528legA3iIpbO2'
                />
            )}
        </div>


    )
}

export default CryptoPage;
