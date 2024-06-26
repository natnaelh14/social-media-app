import { useMutation, useQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { ADD_CRYPTO } from "~/utils/mutations";
import { QUERY_CRYPTOS } from "~/utils/queries";
import CryptoUpdateInput from "./CryptoUpdateInput/crypto_update_input.component";
import { coinsList } from "./coin";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  userId: string;
};

const AddModifyCrypto = ({ open, handleClose, userId }: ModalProps) => {
  const [errorText, setErrorText] = useState<string>("");
  const [addCrypto, {}] = useMutation(ADD_CRYPTO);
  const [addHolding, setAddHolding] = useState("");
  const [addCoin, setAddCoin] = useState("");
  const { loading, error, data, refetch } = useQuery(QUERY_CRYPTOS, {
    variables: {
      user_id: userId,
    },
  });
  if (data) {
    var { cryptoByUserId } = data;
  }

  const handleAddCrypto = async () => {
    try {
      await addCrypto({
        variables: {
          cryptoName: addCoin.toLowerCase(),
          holdingAmount: Number(addHolding),
          userId: userId,
        },
      }).then(() => {
        refetch();
      });
      setAddHolding("");
      setAddCoin("");
    } catch (e) {
      setErrorText("Unable to Add Crypto. Please Try Again.");
      setTimeout(() => {
        setErrorText("");
      }, 3000);
      return e;
    }
  };

  const refreshCrypto = () => {
    refetch();
  };

  return (
    <>
      {cryptoByUserId && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            <Typography
              fontFamily="inherit"
              textAlign="center"
              style={{ fontSize: "20px" }}
            >
              ADD/MODIFY CRYPTO
            </Typography>
            <Box textAlign="right" borderBottom="1px solid #ccc">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent style={{ height: "700px" }}>
            <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
              <Typography
                fontSize="1.2rem"
                textAlign="center"
                fontFamily="inherit"
                style={{ color: "red" }}
              >
                {errorText}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > :not(style)": { m: 1 },
                }}
              >
                <Autocomplete
                  freeSolo
                  disableClearable
                  fullWidth
                  sx={{ paddingBottom: "1rem" }}
                  options={coinsList.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Crypto"
                      variant="standard"
                      value={addCoin}
                      onChange={(e) => setAddCoin(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
                <NumberFormat
                  customInput={TextField}
                  onValueChange={(values: any) => setAddHolding(values.value)}
                  value={addHolding}
                  variant="standard"
                  placeholder={"# of Coins"}
                />
                <Button onClick={handleAddCrypto} variant="contained">
                  ADD
                </Button>
              </Box>
              <Box borderBottom="1px solid #ccc" mb="2rem">
                <Typography
                  display="inline-block"
                  variant="caption"
                  fontSize="16px"
                  marginX="rem"
                  padding="6px 0"
                  fontWeight="500"
                  fontFamily="inherit"
                  borderBottom={`4px solid black`}
                >
                  HOLDINGS
                </Typography>
              </Box>
              {cryptoByUserId &&
                cryptoByUserId.map((val: any) => {
                  return (
                    <CryptoUpdateInput
                      name={val.crypto_name}
                      holding={val.holding_amount}
                      cryptoId={val.id}
                      key={val.id}
                      refreshCrypto={refreshCrypto}
                    />
                  );
                })}
            </Box>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              size="small"
              sx={{
                textTransform: "capitalize",
                padding: "6px 20px",
                marginBottom: "20px",
                width: "60%",
                background: "black",
                fontFamily: "inherit",
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
      )}
    </>
  );
};

export default AddModifyCrypto;
