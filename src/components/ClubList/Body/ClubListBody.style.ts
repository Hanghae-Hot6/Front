import styled from 'styled-components';

// export const Section = styled.section`
//   width: 200px;
//   overflow: hidden;
// `;

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
  section {
    width: 100vw;
    margin-left: -32.5rem;
    overflow: hidden;
    background-color: #5200ff;
    height: 7rem;
    article {
      overflow: hidden;
      ul {
        display: flex;
        justify-content: space-between;
        position: relative;
        margin: 0 auto;
        width: 1280px;
        margin-top: 1.5rem;
        cursor: pointer;
        .on {
          background: #ffffff;
          border-radius: 4rem;
          color: #5200ff;
        }
        li {
          font-weight: 700;
          font-size: 2rem;
          padding: 1.5rem;
          width: 12rem;
          height: 4rem;
          color: #b39fde;
          text-align: center;
          line-height: 1rem;
          transition: all 0.5s;
        }
      }
    }
  }
`;

export const ContentWrap = styled.div`
  width: 1280px;
  margin: 8rem auto;
`;
