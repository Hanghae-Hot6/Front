import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {closeGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../Redux/store/store';
import timer from '../../assets/timer.svg';

type TimerProps = {
  initMin: number;
  initSec: number;
};

function Timer({initMin, initSec}: TimerProps) {
  const dispatch = useAppDispatch();

  const [minutes, setMinutes] = useState(initMin);
  const [seconds, setSeconds] = useState(initSec);
  const [isH2Red, setIsH2Red] = useState(false);

  useEffect(() => {
    // 남은시간이 2분 이하면 빨갛게 표시하기 위해
    if (minutes <= 1) {
      setIsH2Red(true);
    } else {
      setIsH2Red(false);
    }

    const countdown = setInterval(() => {
      if (seconds > 0) {
        // sec이 0보다 크면 1 감소
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        // sec이 0이 됐을때, min도 0이면 타이머 종료
        if (minutes === 0) {
          clearInterval(countdown);
          dispatch(closeGlobalModal('emailCheck'));
        } else {
          // sec이 0이 됐을때, min이 0보다 크면 min - 1이고, sec은 59초로 바꿈
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      // 1초마다 한번씩 실행된다.
    }, 1000);
    return () => clearInterval(countdown);
  }, [dispatch, minutes, seconds]);

  return (
    <StH2 isH2Red={isH2Red}>
      <img src={timer} alt="timer" />
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </StH2>
  );
}

export default Timer;

const StH2 = styled.h2<{isH2Red: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 20%;
  color: ${({isH2Red}) => (isH2Red === true ? 'red' : 'black')};
  font-size: 1.6rem;
  img {
    transform: scale(0.9);
  }
`;
