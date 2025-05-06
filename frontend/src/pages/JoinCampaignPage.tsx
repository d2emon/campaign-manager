import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Button from 'components/ui/Button';
import Paper from 'components/ui/Paper';
import Spinner from 'components/ui/Spinner';
import { useGetCampaignQuery, useGetCampaignsQuery, useJoinCampaignMutation } from 'services/campaignApi';
const JoinCampaignPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();
  const { data: campaign, isLoading, refetch: refetchCampaign } = useGetCampaignQuery(`${id}`);
  const [joinCampaign] = useJoinCampaignMutation();

  const inviteCode = searchParams.get('inviteCode');

  const handleJoin = async () => {
    if (!id || !inviteCode || !campaign) {
      setError('Отсутствует ID кампании или код приглашения');
      return;
    }

    try {
      await joinCampaign({
        id: id,
        inviteCode
      });
      refetchCampaigns();
      refetchCampaign();
      navigate(`/campaigns/${id}`);
    } catch (error) {
      setError('Произошла ошибка при присоединении к кампании');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        campaign={campaign}
      />
      <Paper className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Присоединиться к кампании "{campaign?.title}"</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <p className="mb-4">
          Вы собираетесь присоединиться к кампании. Нажмите кнопку ниже для подтверждения.
        </p>

        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleJoin}
          >
            Присоединиться
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default JoinCampaignPage;
