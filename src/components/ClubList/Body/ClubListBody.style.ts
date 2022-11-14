import styled from 'styled-components';

export const Section = styled.section`
  width: 200px;
`;

// export const ToCreateClubButton = styled(NavigationButton)`
//   display: flex;
//   position: fixed;
//   font-size: 1rem;
//   width: 7.5rem;
//   height: 7.5rem;
//   bottom: 2rem;
//   right: 3rem;
//   border: 1px solid #5200ff;
//   box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
//   border-radius: 50%;
//   color: #fff;
//   background-color: #fff;
// `;

export const TabList = styled.div`
  position: static;
  width: 100%;
  background-color: rgba(255, 255, 255);
  section {
    article {
      ul {
        display: flex;
        position: relative;
        width: 100%;
        height: 42px;
        cursor: pointer;
        .on {
          border: 1px solid #503396;
          border-bottom: 0;
          color: #503396;
        }
        li {
          height: 42px;
          border-top: 1px solid #ebebeb;
          border-right: 1px solid #ebebeb;
          border-bottom: 1px solid #503396;
          width: 25%;
          color: #333;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
`;
