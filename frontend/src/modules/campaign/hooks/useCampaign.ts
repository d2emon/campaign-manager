import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignQuery } from 'services/campaignApi';

const useCampaign = () => {
  const navigate = useNavigate();
  const { campaignId = '' } = useParams<{ campaignId: string }>();
  const [ hasLoaded, setHasLoaded ] = useState(false);

  const {
    data,
    isLoading,
    refetch,
  } = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  });

  const backUrl = campaignId ? `/campaigns/${campaignId}` : '/dashboard';
  const campaign = (campaignId && !isLoading)
    ? data
    : null;

  const goToCampaign = () => {
    navigate(backUrl);
  };

  const loadCampaign = useCallback(async () => {
    await refetch();
    setHasLoaded(true);
  }, [refetch]);

  const reloadCampaign = useCallback(() => {
    setHasLoaded(false);
  }, []);

  useEffect(() => {
    if (campaignId && !hasLoaded) {
      loadCampaign();
    }
  }, [campaignId, hasLoaded, loadCampaign]);

  return {
    campaign,
    campaignId,
    goToCampaign,
    isLoadingCampaign: isLoading,
    refetchCampaign: refetch,
    reloadCampaign,
  };
};

export default useCampaign;
