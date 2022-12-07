import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import DeleteBtn from '../../../common/DeleteBtn';
import {addBook, delBook} from '../../../Redux/modules/slices/selectBooksSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/store/store';
import {NaverBooksDataType} from '../../../types/bookSearch';
import validate from '../../../utils/validate';

type PaginationBooksChildProps = {
  data: NaverBooksDataType[] | undefined;
  borderWidth: number;
  borderHeight: number;
  dataLength?: number;
  widthPortion?: number;
};

const PaginationBooksChild = ({
  data,
  borderWidth,
  borderHeight,
  dataLength,
  widthPortion = 45,
}: PaginationBooksChildProps) => {
  const books = useAppSelector(state => state.selectBooksReducer);
  const dispatch = useAppDispatch();

  const handleBookClick = (selectedBook: NaverBooksDataType) => {
    dispatch(addBook(selectedBook));
  };

  const divRef = useRef<HTMLDivElement | null>(null);
  // console.log('child width ' + divRef.current?.getBoundingClientRect().width);

  return (
    <Div
      id="child"
      ref={divRef}
      width={borderWidth}
      height={borderHeight}
      widthPortion={widthPortion}
      dataLength={dataLength!}>
      {data &&
        data?.map((val, index) => {
          let CheckClicked = false;

          Object.values(books).forEach(selectedBook => {
            if (selectedBook?.isbn === val?.isbn) {
              CheckClicked = true;
            }
          });

          return (
            <Wrap key={index}>
              <LeftDiv
                clicked={CheckClicked}
                onClick={() => {
                  handleBookClick(val);
                }}>
                {val && (
                  <ImageWrapper width={borderWidth} height={borderHeight}>
                    <Image src={val?.image} />
                  </ImageWrapper>
                )}
                <SmallDiv>
                  <Title>{val?.title}</Title>
                  <Price>{val?.pubdate}</Price>
                  <Desc>{val?.description}</Desc>
                </SmallDiv>
              </LeftDiv>
            </Wrap>
          );
        })}
    </Div>
  );
};
export default PaginationBooksChild;

const Div = styled.div<{
  width: number;
  height: number;
  widthPortion: number;
  dataLength: number;
}>`
  width: ${(props: {width: number; widthPortion: number}) =>
    props.widthPortion * 0.01 * props.width}rem;

  height: ${(props: {height: number}) => 0.8 * 0.9 * props.height}rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

/* width: ${(props: {width: number; widthPortion: number}) =>
    props.widthPortion * 0.01 * props.width}rem; */

const Wrap = styled.div`
  width: 100%;
  height: calc(100% / 3);
  padding: 1rem 2rem;
  /* border: 1px solid black; */

  /* :hover {
    .rightBox {
      opacity: 1;
    }
  } */
`;

const DeleteBtnWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
`;

const LeftDiv = styled.div<{clicked: boolean}>`
  display: flex;
  position: relative;
  /* ${({clicked}) => {
    if (clicked) {
      return `border: 1px solid black;`;
    }
  }} */

  &:hover {
    box-shadow: 10px 5px 5px #f1f1f1;
  }
`;

const ImageWrapper = styled.div<{width: number; height: number}>`
  width: ${({width}) => 0.07 * width}rem;
  height: ${({height}) => 0.18 * height}rem;

  filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
`;

const Image = styled.img`
  height: 100%;

  object-fit: contain;
`;

const SmallDiv = styled.div`
  width: 60%;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 20rem;
  margin-bottom: 0.8rem;
`;

const Price = styled.span`
  margin-bottom: 0.2rem;
`;
const Desc = styled.span`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 120%;
  line-height: 1.4;
  height: 2.8rem;
  overflow: hidden;
`;

/////////////////////////////////////

const Box = styled.div<{width: number; height: number}>`
  /* width: 100%; */
  width: 30rem;
  height: 12rem;
  display: flex;
  padding: 1rem;
  /* border: 1px solid black; */
  /* margin-bottom: 1rem; */
  margin-left: 3rem;
  margin-top: 1rem;
  /* border: 1px solid black; */
  /* background-color: #333; */
`;
const Author = styled.span``;

const Content = styled.span``;

const TitleWrap = styled.div`
  margin-left: 1.5rem;
  margin-top: 1rem;
`;
const RightBox = styled.div`
  opacity: 0;
  position: absolute;
  top: 10%;
  right: 5%;
  transition: all 0.5s;
  > div {
    display: flex;
  }
  > div > img {
    width: 14.8rem;
    height: 21.6rem;
    filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
    object-fit: cover;
  }
`;
const TextWrap = styled.div`
  padding: 10px 24px;
  margin-top: 2.4rem;
  width: 40rem;
  height: 9.4rem;
  background: #f1f1f5;
  border-radius: 7px;
  > p {
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;

// {val && (
//     <RightBox className="rightBox">
//       <div>
//         <img src={val?.image} alt={val?.title} />
//         <TitleWrap>
//           <Title>{val?.title}</Title>
//           <Price>{val?.pubdate}</Price>
//         </TitleWrap>
//       </div>
//       <TextWrap>
//         <p>{val?.description}</p>
//       </TextWrap>
//     </RightBox>
//   )}
