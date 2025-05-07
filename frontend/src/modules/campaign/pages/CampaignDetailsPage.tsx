import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CampaignDetails from 'components/modules/Campaign/CampaignDetails';
import {
  useDeleteCampaignMutation,
  useGenerateNPCMutation,
  useGetCampaignQuery,
} from 'services/campaignApi';

const CampaignDetailsPage = () => {
  const navigate = useNavigate();
  const { campaignId = '' } = useParams<{ campaignId: string }>();

  const getCampaignQuery = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  });
  const [deleteCampaign] = useDeleteCampaignMutation();
  const [generateNPC] = useGenerateNPCMutation();

  const campaign = (campaignId && !getCampaignQuery.isLoading)
    ? getCampaignQuery.data
    : null;

  const handleDelete = async () => {
    if (!campaignId) {
      return;
    }

    try {
      await deleteCampaign(campaignId);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleGenerateNPC = async () => {
    if (!campaignId) {
      return;
    }

    try {
      await generateNPC(campaignId);
      getCampaignQuery.refetch();
    } catch (error) {
      console.error('Error generating NPC:', error);
    }
  };

  return (
    <DetailPage
      backUrl="/dashboard"
      breadcrumbs={{
        campaign: campaign,
      }}
      isLoading={getCampaignQuery.isLoading}
      isNotFound={!campaign}
      notFoundMessage="Кампания не найдена"
    >
      { campaign && (
        <CampaignDetails
          campaign={campaign}
          onDelete={handleDelete}
          onEdit={() => navigate(`/campaigns/${campaignId}/edit`)}
          onGenerate={handleGenerateNPC}
        />
      )}
    </DetailPage>
  );
};

export default CampaignDetailsPage; 