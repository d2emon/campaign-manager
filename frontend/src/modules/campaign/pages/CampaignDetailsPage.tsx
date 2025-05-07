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

  const getCampaign = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  });
  const [deleteCampaign] = useDeleteCampaignMutation();
  const [generateNPC] = useGenerateNPCMutation();

  const campaign = (campaignId && !getCampaign.isLoading)
    ? getCampaign.data
    : null;
  const isLoading = getCampaign.isLoading;
  const isNotFound = !campaign;

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
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
    if (isNotFound || isLoading || !campaignId) {
      return;
    }

    try {
      await generateNPC(campaignId);
      getCampaign.refetch();
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
      isLoading={isLoading}
      isNotFound={isNotFound}
      notFoundMessage="Кампания не найдена"
      title={campaign?.title}
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