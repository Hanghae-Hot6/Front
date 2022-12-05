import styled from 'styled-components';

export const ReviewCreate = styled.input`
  width: 50rem;
  height: 5rem;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 576px) {
    width: 75vw;
  }
`;

export const ReviewWrap = styled.section`
  margin-top: 15px;
  padding: 10px;
  padding-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  small {
    font-size: 18px;
  }
  > div {
    border-bottom: 1px dashed #ccc;
    margin-bottom: 5px;
    padding-bottom: 8px;
  }
  > div {
    display: flex;
    justify-content: space-between;
  }
  > div > div > small {
    margin-right: 10px;
  }
  > div > div > small:last-child {
    font-size: 12px;
    color: #777;
  }
`;

export const Btn = styled.button`
  width: 5rem;
  height: 2.5rem;
  color: #fff;
  border-radius: 5px;
  margin-left: 10px;
  background-color: ${props => props.theme.MainColor};
  border: 1px solid transparent;
  transition: all 0.5s;
  :hover {
    border: 1px solid ${props => props.theme.MainColor};
    color: ${props => props.theme.MainColor};
    background-color: #fff;
  }
`;

export const ReviewCreateWrap = styled.section`
  @media screen and (max-width: 576px) {
    display: flex;
    width: 90vw;
    justify-content: space-between;
  }
`;
