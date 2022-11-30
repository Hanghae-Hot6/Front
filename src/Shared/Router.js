import {Route, Routes, BrowserRouter} from 'react-router-dom';

import ClubDetailPage from '../Pages/ClubDetailPage';
import ClubListPage from '../Pages/ClubListPage';
import CreateClubPage from '../Pages/CreateClubPage';
import FindIdPage from '../Pages/FindIdPage';
import FindPasswordPage from '../Pages/FindPasswordPage';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/find-id" element={<FindIdPage />} />
        <Route path="/login/find-password" element={<FindPasswordPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/sign" element={<SignPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
