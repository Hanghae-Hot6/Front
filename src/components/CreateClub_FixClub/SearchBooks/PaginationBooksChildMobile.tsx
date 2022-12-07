import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import DeleteBtn from '../../../common/DeleteBtn';
import {addBook, delBook} from '../../../Redux/modules/slices/selectBooksSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/store/store';
import {NaverBooksDataType} from '../../../types/bookSearch';
import validate from '../../../utils/validate';

type PaginationBooksChildMobileProps = {
  data: NaverBooksDataType[] | undefined;
  borderWidth: number;
  borderHeight: number;
  dataLength?: number;
  widthPortion?: number;
};

const PaginationBooksChildMobile = ({
  data,
  borderWidth,
  borderHeight,
  dataLength,
  widthPortion = 45,
}: PaginationBooksChildMobileProps) => {
  const books = useAppSelector(state => state.selectBooksReducer);
  const dispatch = useAppDispatch();

  const handleBookClick = (selectedBook: NaverBooksDataType) => {
    dispatch(addBook(selectedBook));
  };

  const divRef = useRef<HTMLDivElement | null>(null);

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
export default PaginationBooksChildMobile;

const Div = styled.div<{
  width: number;
  height: number;
  widthPortion: number;
  dataLength: number;
}>`
  /* width: ${({width}) => width}rem; */
  width: 88vw;
  height: ${(props: {height: number}) => 0.8 * 0.9 * props.height}rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  /* border: 1px solid black; */
`;

const Wrap = styled.div`
  width: 100%;
  height: calc(100% / 3);
  padding: 1rem 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const LeftDiv = styled.div<{clicked: boolean}>`
  display: flex;
  /* justify-content: space-between; */
  position: relative;

  &:hover {
    box-shadow: 10px 5px 5px #f1f1f1;
  }
`;

const ImageWrapper = styled.div<{width: number; height: number}>`
  /* width: ${({width}) => 0.07 * width}rem;
  height: ${({height}) => 0.18 * height}rem; */
  width: 14rem;
  height: 12.7rem;
  /* margin: auto; */

  filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
`;

const Image = styled.img`
  height: 100%;
  object-fit: contain;
`;

const SmallDiv = styled.div`
  width: 60%;
  padding: 1.7rem 0rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 15rem;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const Desc = styled.span`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 30vw;
  height: 2.5rem;
  overflow: hidden;
`;

const DeleteBtnWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
`;

/////////////////////////////////////
