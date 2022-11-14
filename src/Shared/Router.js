import {Route, Routes, BrowserRouter} from 'react-router-dom';
import ChatPage from '../Pages/ChatPage';
import ClubDetail from '../Pages/ClubDetail';
import ClubListPage from '../Pages/ClubListPage';
import CreateClubPage from '../Pages/CreateClubPage';
import LoginPage from '../Pages/LoginPage';
import MainPage from '../Pages/MainPage';
import ProfilePage from '../Pages/ProfilePage';
import SignPage from '../Pages/SignPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/club_detail/:id" element={<ClubDetail />} />
        <Route path="/club_list" element={<ClubListPage />} />
        <Route path="/create_club" element={<CreateClubPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/sign" element={<SignPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
