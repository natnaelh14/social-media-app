import { useQuery } from "@apollo/client";
import { connect } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import Logo from "../../assets/logo.svg";
import { auth } from "../../firebase/utils";
import { getCurrentUser } from "../../redux/user.selectors";
import { QUERY_CHECK_CONNECTION } from "../../utils/queries";
import {
  ConnectionContainer,
  HeaderContainer,
  LogoContainer,
  OptionTag,
  OptionsContainer,
} from "./header.styles";

const Header = (props: any) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user, loading, error } = currentUser;
  const {
    loading: connectionLoading,
    error: connectionError,
    data: connection,
  } = useQuery(QUERY_CHECK_CONNECTION);

  return (
    <HeaderContainer>
      <LogoContainer to="/home/feed">
        <img src={Logo} alt="crypto connect logo" />
      </LogoContainer>
      <ConnectionContainer>
        {connectionError ? (
          <h2 style={{ color: "#E02424", fontSize: "15px" }}>
            • API Not Connected
          </h2>
        ) : connectionLoading ? (
          <h2 style={{ color: "#E3A008", fontSize: "15px" }}>• API Loading</h2>
        ) : (
          connection && (
            <h2 style={{ color: "#31C48D", fontSize: "15px" }}>
              • API Connected
            </h2>
          )
        )}
      </ConnectionContainer>
      <>
        {!(loading || error) && user && (
          <OptionsContainer>
            <OptionTag onClick={() => auth.signOut()}>
              <span>SIGN OUT</span>
            </OptionTag>
          </OptionsContainer>
        )}
      </>
    </HeaderContainer>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(Header);
