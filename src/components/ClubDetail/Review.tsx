import React, {useState} from 'react';
import {useQuery, useMutation} from 'react-query';
import {reviewApis} from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {log} from 'console';
export type review = {
  review: string;
};
const Review = ({subscription}: {subscription: boolean}) => {
  const {id} = useParams();
  const [input, setInput] = useState<review>({
    review: '테스트',
  });
  console.log(subscription);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };
  console.log(input);

  // 리뷰 만들기 api
  const {mutate: createReview} = useMutation(
    async ({id, input}: any) => {
      const response = await reviewApis.createReview(id, input);
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
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

  // 리뷰 지우기 api
  const {mutate: deleteReview} = useMutation(
    async ({clubId, reviewId}: any) => {
      const response = await reviewApis.deleteReview(clubId, reviewId);
      return response.data.data;
    },
    {
      onError: error => {
        console.log('리뷰 삭제 에러', error);
      },
    },
  );
  return (
    <>
      <section>
        <h2>
          모임에 대한 <span>후기를 남겨주세요!</span>
        </h2>
        <input
          name="review"
          placeholder="후기를 작성해 주세요"
          width="30rem"
          onChange={handleChange}
        />

        <button onClick={createReview}> 작성</button>
        {/* 이 글에 대한 유저 아이디와 내 로컬아이디 같으면 삭제 버튼 나오게 */}
        <p>
          <span>작성자</span>
          내용
          <small>작성 날짜</small>
          <button onClick={deleteReview}>삭제</button>
        </p>
      </section>
    </>
  );
};

export default Review;
