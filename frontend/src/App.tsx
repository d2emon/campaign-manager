import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import CampaignFormPage from './pages/EditCampaignPage';
import CampaignDetailsPage from './pages/CampaignDetailsPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/campaigns/new" element={<CampaignFormPage />} />
          <Route path="/campaigns/:id/edit" element={<CampaignFormPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
