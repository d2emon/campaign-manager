import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CampaignDetails from 'components/modules/Campaign/CampaignDetails';
import {
  useDeleteCampaignMutation,
  useGenerateNPCMutation,
} from 'services/campaignApi';
import useCampaign from '../hooks/useCampaign';

const CampaignDetailsPage = () => {
  const navigate = useNavigate();
  const {
    campaign,
    campaignId,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();

  const [deleteCampaign] = useDeleteCampaignMutation();
  const [generateNPC] = useGenerateNPCMutation();

  const isNotFound = !campaign;

  const handleBack = () => {
    navigate('/dashboard');
  };
  
  const handleDelete = async () => {
    if (isNotFound || isLoadingCampaign) {
      return;
    }

    try {
      await deleteCampaign(campaignId);
      handleBack();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleGenerateNPC = async () => {
    if (isNotFound || isLoadingCampaign || !campaignId) {
      return;
    }

    try {
      await generateNPC(campaignId);
      reloadCampaign();
    } catch (error) {
      console.error('Error generating NPC:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign: campaign,
      }}
      isLoading={isLoadingCampaign}
      isNotFound={isNotFound}
      notFoundMessage="Кампания не найдена"
      title={campaign?.title}
      onBack={handleBack}
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