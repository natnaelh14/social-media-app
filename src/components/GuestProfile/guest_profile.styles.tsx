import styled from 'styled-components';

export const GuestDataContainer = styled.div`
  display: flex;
  flexDirection: row;
  justify-content: space-around;
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
  }
`;