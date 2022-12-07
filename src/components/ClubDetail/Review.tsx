import React, {useState} from 'react';
import {useQuery, useMutation} from 'react-query';
import {reviewApis} from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {getUserId} from '../../utils';
import * as R from './Review.style';

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
      onError: error => {},
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
      onError: error => {},
    },
  );

  return (
    <>
      <section>
        <h2>
          모임에 대한 <span>후기를 남겨주세요!</span>
        </h2>
        <R.ReviewCreateWrap>
          {subscription ? (
            <>
              <R.ReviewCreate
                name="comment"
                value={input.comment}
                placeholder="후기를 작성해 주세요"
                onChange={handleChange}
              />
              {input.comment === '' ? (
                <R.Btn
                  onClick={() => alert('내용을 입력해 주세요')}
                  style={{height: '5rem'}}>
                  작성
                </R.Btn>
              ) : (
                <R.Btn
                  onClick={() => createReview({id, input})}
                  style={{height: '5rem'}}>
                  작성
                </R.Btn>
              )}
            </>
          ) : (
            <>
              <R.ReviewCreate
                placeholder="모임에 가입해야 후기를 작성할 수 있어요 !"
                readOnly
              />
            </>
          )}
        </R.ReviewCreateWrap>

        {data &&
          // eslint-disable-next-line array-callback-return
          data.map((item: reviewItem, idx: number) => {
            return (
              <R.ReviewWrap key={idx}>
                <div>
                  <div>
                    <small>{item.memberId}</small>
                    <small>{item.createdAt?.split('T', 1)}</small>
                  </div>

                  {userId === item.memberId ? (
                    <R.Btn onClick={() => deleteReview(item?.reviewId)}>
                      삭제
                    </R.Btn>
                  ) : null}
                </div>

                <small>{item.comment}</small>

                {/* 이 글에 대한 유저 아이디와 내 로컬아이디 같으면 삭제 버튼 나오게 */}
              </R.ReviewWrap>
            );
          })}
      </section>
    </>
  );
};

export default Review;
