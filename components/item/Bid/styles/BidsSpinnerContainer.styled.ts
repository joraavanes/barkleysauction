import { styled } from 'styled-components';

export const BidsSpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  backdrop-filter: blur(3px);
`;