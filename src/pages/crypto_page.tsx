import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Button, Fade, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useAppSelector } from "../app/hooks";
import AddModifyCrypto from "../components/AddModifyCrypto/AddModifyCrypto";
import CryptoCurrency from "../components/Cryprocurrency/cryptocurrency.component";
import CryptoDoughnut from "../components/CryptoDoughnut/crypto_doughnut.component";
import { userProps } from "../index.types";
import { QUERY_CRYPTOS } from "../utils/queries";
import CryptoPageLoading from "./loading/crypto_page_loading";
import {
  CryptoCarouselContainer,
  CryptoDataContainer,
  CryptoDoughnutContainer,
  CryptoPageContainer,
} from "./styles/crypto_page.styles";

const useStyles = makeStyles((theme) => ({
  carouselFormat: {
    width: "300px",
    height: "500px",
  },
}));

const CryptoPage = () => {
  const classes = useStyles();

  const currentUser = useAppSelector((state) => state.currentUser);
  const {
    error: currentUserError,
    loading: currentUserLoading,
    user,
  } = currentUser;
  const userInfo: userProps = user;

  const {
    error: cryptoError,
    loading: cryptoLoading,
    data,
    refetch,
  } = useQuery(QUERY_CRYPTOS, {
    variables: {
      user_id: userInfo.id,
    },
  });
  if (data) {
    var { cryptoByUserId } = data;
  }

  const [openModal, setOpenModal] = React.useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    refetch();
    setOpenModal(false);
  };

  const pending =
    currentUserError || currentUserLoading || cryptoError || cryptoLoading;

  return (
    <CryptoPageContainer>
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            border: "1px solid #cdcdcd",
            padding: "20px",
            width: "100%",
            "@media (max-width: 1000px)": {
              paddingLeft: "0px",
              paddingRight: "0px",
            },
          }}
        >
          {pending ? (
            <CryptoPageLoading />
          ) : (
            <>
              <CryptoDataContainer>
                <CryptoCarouselContainer>
                  <Grid
                    item
                    padding="1rem 1rem 1rem 1rem"
                    width="350px"
                    height="450px"
                    border="5px solid #ccc"
                  >
                    <Carousel
                      fullHeightHover={false}
                      className={classes.carouselFormat}
                      NextIcon={<SkipNextIcon />}
                      PrevIcon={<SkipPreviousIcon />}
                    >
                      {cryptoByUserId &&
                        cryptoByUserId.map((crypto: any) => {
                          return (
                            <CryptoCurrency
                              key={crypto.id}
                              name={crypto.crypto_name}
                            />
                          );
                        })}
                    </Carousel>
                  </Grid>
                </CryptoCarouselContainer>
                <CryptoDoughnutContainer>
                  <CryptoDoughnut currentUser={userInfo.id} />
                </CryptoDoughnutContainer>
              </CryptoDataContainer>
              <Box
                textAlign="right"
                padding="10px 20px"
                sx={{
                  "@media (max-width: 1200px)": {
                    marginTop: "1rem",
                    textAlign: "center",
                  },
                }}
              >
                <Button
                  size="small"
                  onClick={handleModalOpen}
                  sx={{
                    textTransform: "capitalize",
                    padding: "6px 20px",
                    background: "black",
                    borderRadius: "12px",
                    "&:hover": {
                      background: "#333",
                      fontFamily: "inherit",
                    },
                  }}
                  variant="contained"
                >
                  ADD/MODIFY CRYPTO
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
      {openModal && (
        <AddModifyCrypto
          open={openModal}
          handleClose={handleModalClose}
          userId={userInfo.id}
        />
      )}
    </CryptoPageContainer>
  );
};

export default CryptoPage;
