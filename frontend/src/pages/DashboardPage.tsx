import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { getCampaigns, Campaign } from 'services/campaignService';

const DashboardPage = () => {
  const { user, isInitialized } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isReady = isInitialized && !isLoading;

  useEffect(() => {
    if (isInitialized) {
      if (!user) {
        navigate('/login');
      } else {
        setIsLoading(false);
      }
    }

    const loadCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Error loading campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, [user, navigate, isInitialized]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Кампании */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Мои кампании</h3>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/campaigns/new')}
                  className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Создать кампанию
                </button>
              </div>

              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">У вас пока нет кампаний</h3>
                  <p className="mt-2 text-gray-500">
                    Создайте свою первую кампанию, чтобы начать игру
                  </p>
                </div>                    
              ) : (
                <div className="mt-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition cursor-pointer"
                      onClick={() => navigate(`/campaigns/${campaign.id}`)}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-gray-900">
                            {campaign.title}
                          </h3>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {campaign.gameSystem}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-500 line-clamp-3">
                          {campaign.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <span>Игроков: {campaign.maxPlayers}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/campaigns/${campaign.id}/edit`);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Редактировать
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Персонажи */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Мои персонажи</h3>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/characters/new')}
                  className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Создать персонажа
                </button>
              </div>
            </div>
          </div>

          {/* Настройки */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Настройки</h3>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                  Редактировать профиль
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage; 