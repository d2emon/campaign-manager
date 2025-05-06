import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCampaignsQuery } from 'services/campaignApi';
import { selectIsLoadingAuth, selectUser } from 'store/auth';
import Paper from 'components/ui/Paper';

const DashboardPage = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data: campaigns, isLoading: isCampaignsLoading } = useGetCampaignsQuery();

  useEffect(() => {
    if (!isLoadingAuth) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [isLoadingAuth, navigate, user]);

  if (isLoadingAuth) {
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
          <Paper>
            <h3 className="text-lg font-medium text-gray-900">Мои кампании</h3>
            <div className="mt-4">
              <button
                onClick={() => navigate('/campaigns/new')}
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Создать кампанию
              </button>
            </div>

            {isCampaignsLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : !campaigns || campaigns.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">У вас пока нет кампаний</h3>
                <p className="mt-2 text-gray-500">
                  Создайте свою первую кампанию, чтобы начать игру
                </p>
              </div>                    
            ) : (
              <div className="mt-4">
                {campaigns.map((campaign) => (
                  <Paper
                    key={campaign.id}
                    className="hover:shadow-md transition cursor-pointer mb-4"
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
                  </Paper>
                ))}
              </div>
            )}
          </Paper>

          {/* Персонажи */}
          <Paper>
            <h3 className="text-lg font-medium text-gray-900">Мои персонажи</h3>
            <div className="mt-4">
              <button
                onClick={() => navigate('/characters/new')}
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Создать персонажа
              </button>
            </div>
          </Paper>

          {/* Настройки */}
          <Paper>
            <h3 className="text-lg font-medium text-gray-900">Настройки</h3>
            <div className="mt-4">
              <button
                onClick={() => navigate('/settings')}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition"
              >
                Редактировать профиль
              </button>
            </div>
          </Paper>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage; 