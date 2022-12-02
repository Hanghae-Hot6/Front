import React, {useState} from 'react';
import {useQuery, useMutation} from 'react-query';
import {reviewApis} from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {getUserId} from '../../utils';
import styled from 'styled-components';

export type review = {
  comment: string;
};
export type reviewItem = {
  memberId: string;
  comment: string | null | undefined;
  createdAt: string | null;
  reviewId: number;
};
const Review = ({subscription}: {subscription: boolean}) => {
  const {id} = useParams();
  const userId = getUserId();
  const [input, setInput] = useState<review>({
    comment: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  // 리뷰 만들기 api
  const {mutate: createReview} = useMutation(
    async ({id, input}: any) => {
      const response = await reviewApis.createReview(id, input);
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
        setInput({comment: ''});
      },
      onError: error => {
        console.log('리뷰 작성 에러', error);
      },
    },
  );

  // 리뷰 가져오기 api
  const {data} = useQuery(['getReview', id], async ({queryKey}: any) => {
    const response = await reviewApis.getReview(queryKey[1]);
    return response.data.data;
  });

  // // 리뷰 지우기 api
  const {mutate: deleteReview} = useMutation(
    async (id: any) => {
      const response = await reviewApis.deleteReview(id);
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
      },
      onError: error => {
        console.log('리뷰 삭제 에러', error);
      },
    },
  );
  console.log(typeof input.comment);

  return (
    <>
      <section>
        <h2>
          모임에 대한 <span>후기를 남겨주세요!</span>
        </h2>
        {subscription ? (
          <>
            <ReviewCreate
              name="comment"
              value={input.comment}
              placeholder="후기를 작성해 주세요"
              onChange={handleChange}
            />
            {input.comment === '' ? (
              <Btn
                onClick={() => alert('내용을 입력해 주세요')}
                style={{height: '5rem'}}>
                작성
              </Btn>
            ) : (
              <Btn
                onClick={() => createReview({id, input})}
                style={{height: '5rem'}}>
                작성
              </Btn>
            )}
          </>
        ) : (
          <>
            <ReviewCreate
              placeholder="모임에 가입해야 후기를 작성할 수 있어요 !"
              readOnly
            />
          </>
        )}

        {data &&
          // eslint-disable-next-line array-callback-return
          data.map((item: reviewItem, idx: number) => {
            return (
              <ReviewWrap key={idx}>
                <div>
                  <div>
                    <small>{item.memberId}</small>
                    <small>{item.createdAt?.split('T', 1)}</small>
                  </div>

                  {userId === item.memberId ? (
                    <Btn onClick={() => deleteReview(item?.reviewId)}>삭제</Btn>
                  ) : null}
                </div>

                <small>{item.comment}</small>

                {/* 이 글에 대한 유저 아이디와 내 로컬아이디 같으면 삭제 버튼 나오게 */}
              </ReviewWrap>
            );
          })}
      </section>
    </>
  );
};

export default Review;

export const ReviewCreate = styled.input`
  width: 50rem;
  height: 50px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;

export const ReviewWrap = styled.p`
  margin-top: 15px;
  padding: 10px;
  padding-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  height: 2rem;
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
