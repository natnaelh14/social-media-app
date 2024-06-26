import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  position: relative;
  @media (max-width: 1400px) {
    margin-bottom: 0px;
  }
`;

export const ConnectionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 15px;
`;

export const LogoContainer = styled(NavLink)`
  height: 100%;
  /* width: 70px; */
  padding: 25px;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const OptionsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  & > :last-child {
    margin-left: 15px;
  }
`;

export const OptionTag = styled.div`
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
`;
