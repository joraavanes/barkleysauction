import { styled } from 'styled-components';

export const BidItemStyled = styled.li`
  list-style: none;
  margin-bottom: 0;
  padding-top:0;
  margin-bottom: .75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  transition: all .5s ease-in-out;
  box-shadow:0 0 0 0;

  &:hover{
      border-color: #f91890;
      box-shadow: 0 10px 20px -19px;
      z-index: 100;
      cursor:pointer;
  }
`;