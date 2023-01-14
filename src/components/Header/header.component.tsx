import { connect } from "react-redux";
import { getCurrentUser } from "../../redux/user.selectors";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth } from "../../firebase/firebase.utils";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  ConnectionContainer,
  OptionTag,
} from "./header.styles";
import { useAppSelector } from "../../app/hooks";
import { QUERY_CHECK_CONNECTION } from "../../utils/queries";
import { useQuery } from "@apollo/client";

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
        <Logo className="logo" />
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
