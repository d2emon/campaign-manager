import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Title } from '@mantine/core';
import DetailPage from 'components/layout/DetailPage';
import Button from 'components/ui/Button';
import ButtonBlock from 'components/ui/ButtonBlock';
import ErrorBlock from 'components/ui/ErrorBlock';
import { useJoinCampaignMutation } from 'modules/campaign/services/campaignApi';
import useCampaign from '../hooks/useCampaign';

const JoinCampaignPage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const {
    campaign,
    goToCampaign,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();

  const [joinCampaign] = useJoinCampaignMutation();

  const inviteCode = searchParams.get('inviteCode');

  const handleJoin = async () => {
    if ( !inviteCode || !campaign) {
      setError('Отсутствует ID кампании или код приглашения');
      return;
    }

    try {
      await joinCampaign({
        id: campaign.id,
        inviteCode
      });
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      setError('Произошла ошибка при присоединении к кампании');
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign: campaign,
      }}
      isLoading={isLoadingCampaign}
      isNotFound={!campaign}
      notFoundMessage="Кампания не найдена"
      onBack={goToCampaign}
    >
      <Card
        className="max-w-lg mx-auto"
      >
        <Title order={2}>Присоединиться к кампании "{campaign?.title}"</Title>

        <ErrorBlock message={error} />

        <p className="my-4">
          Вы собираетесь присоединиться к кампании. Нажмите кнопку ниже для подтверждения.
        </p>

        <ButtonBlock>
          <Button
            variant="secondary"
            onClick={goToCampaign}
          >
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleJoin}
          >
            Присоединиться
          </Button>
        </ButtonBlock>
      </Card>
    </DetailPage>
  );
};

export default JoinCampaignPage;
