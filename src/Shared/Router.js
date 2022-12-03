import {Route, Routes, BrowserRouter} from 'react-router-dom';
import InterestClubs from '../components/Profile/InterestClubs';
import LeaderClubs from '../components/Profile/LeaderClubs';

import ClubDetailPage from '../Pages/ClubDetailPage';
import ClubListPage from '../Pages/ClubListPage';
import CreateClubPage from '../Pages/CreateClubPage';
import FindIdPage from '../Pages/FindIdPage';
import FindPasswordPage from '../Pages/FindPasswordPage';
import FixClubPage from '../Pages/FixClubPage';
import LoginPage from '../Pages/LoginPage';
import MainPage from '../Pages/MainPage';
import NotFoundPage from '../Pages/NotFoundPage';
import ProfilePage from '../Pages/ProfilePage';

import SignPage from '../Pages/SignPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/club_detail/:id" element={<ClubDetailPage />} />
        <Route path="/club_list" element={<ClubListPage />} />
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
