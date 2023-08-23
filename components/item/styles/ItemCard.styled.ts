import { styled } from 'styled-components';

export const ItemCardStyled = styled.div.attrs(props => ({
  className: 'card'
}))`
  transition: all 0.5s ease-in-out;

  &:hover {
    border-color: var(--primary-pink);
    box-shadow: 0 0 8px 1px #ccc;

    .btn {
      background-color: var(--primary-pink);
      border-color: var(--primary-pink);
    }
  }
`;