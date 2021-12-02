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

export const CryptoDoughnutContainer = styled.div`
@media (max-width: 1400px) {
  display: flex;
  justify-content: center;
}
`;

export const CryptoCarouselContainer = styled.div`
@media (max-width: 1400px) {
  display: flex;
  justify-content: center;
}
`;