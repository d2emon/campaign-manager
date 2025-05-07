import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from 'components/layout/Header';
import { AuthProvider } from 'contexts/AuthContext';
import CampaignDetailsPage from 'modules/campaign/pages/CampaignDetailsPage';
import CharacterDetailsPage from 'modules/character/pages/CharacterDetailsPage';
import LocationDetailsPage from 'modules/location/pages/LocationDetailsPage';
import DashboardPage from 'pages/DashboardPage';
import CampaignFormPage from 'pages/EditCampaignPage';
import EditCharacterPage from 'pages/EditCharacterPage';
import JoinCampaignPage from 'pages/JoinCampaignPage';
import EditLocationPage from 'pages/EditLocationPage';
import LoginPage from 'pages/LoginPage';
import PrivateRoute from 'pages/PrivateRoute';
import RegisterPage from 'pages/RegisterPage';
import { store } from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/campaigns/new" element={<CampaignFormPage />} />
                <Route path="/campaigns/:id/edit" element={<CampaignFormPage />} />
                <Route path="/campaigns/:campaignId" element={<CampaignDetailsPage />} />
                <Route path="/campaigns/:id/characters/new" element={<EditCharacterPage />} />
                <Route path="/campaigns/:id/characters/:characterId/edit" element={<EditCharacterPage />} />
                <Route path="/campaigns/:campaignId/characters/:characterId" element={<CharacterDetailsPage />} />
                <Route path="/campaigns/:campaignId/locations/new" element={<EditLocationPage />} />
                <Route path="/campaigns/:campaignId/locations/:locationId/edit" element={<EditLocationPage />} />
                <Route path="/campaigns/:campaignId/locations/:locationId" element={<LocationDetailsPage />} />
                <Route path="/campaigns/:id/join" element={<JoinCampaignPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;
