import styled from 'styled-components';

export const CryptoDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
  }
`;