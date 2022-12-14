import {useEffect, useState} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import MainPage from '../Pages/MainPage';
import NotFoundPage from '../Pages/NotFoundPage';
import MobileChatPage from '../Pages/MobileChatPage';
import ClubDetailPage from '../Pages/ClubDetailPage';
import ClubListPage from '../Pages/ClubListPage';
import ChatTestPage from '../Pages/ChatTestPage';
import CreateClubPage from '../Pages/CreateClubPage';
import FixClubPage from '../Pages/FixClubPage';
import LoginPage from '../Pages/LoginPage';
import FindIdPage from '../Pages/FindIdPage';
import FindPasswordPage from '../Pages/FindPasswordPage';
import ProfilePage from '../Pages/ProfilePage';
import InterestClubs from '../components/Profile/ProfileOutlet/InterestClubs';
import LeaderClubs from '../components/Profile/ProfileOutlet/LeaderClubs';
import SignPage from '../Pages/SignPage';

import useWindowSizeDetector from '../Hooks/useWindowSizeDetector';

const Router = () => {
  // 576px 이하일 때부터 /chat 에 들어갈 수 있다
  const {windowWidth} = useWindowSizeDetector();
  const [chatRouterOn, setChatRouterOn] = useState(false);

  useEffect(() => {
    if (windowWidth < 576) {
      setChatRouterOn(true);
    } else {
      setChatRouterOn(false);
    }
  }, [windowWidth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {chatRouterOn && (
          <Route path="/mobile_chat" element={<MobileChatPage />} />
        )}
        <Route path="/club_detail/:id" element={<ClubDetailPage />} />
        <Route path="/club_list" element={<ClubListPage />} />
        <Route path="/chat_test" element={<ChatTestPage />} />
        <Route path="/create_club" element={<CreateClubPage />} />
        <Route path="/fix_club/:id" element={<FixClubPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/find-id" element={<FindIdPage />} />
        <Route path="/login/find-password" element={<FindPasswordPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />}>
          <Route path="interest" element={<InterestClubs />} />
          <Route path="leader" element={<LeaderClubs />} />
        </Route>
        <Route path="/sign" element={<SignPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
