import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampaignForm from 'components/modules/Campaign/CampaignForm';
import { useAuth } from 'contexts/AuthContext';
import { getCampaign, createCampaign, updateCampaign, Campaign } from 'services/campaignService';

const CampaignFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Partial<Campaign> | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      const loadCampaign = async () => {
        try {
          const data = await getCampaign(id);
          setCampaign(data);
        } catch (error) {
          console.error('Error loading campaign:', error);
          navigate('/dashboard');
        } finally {
          setIsLoading(false);
        }
      };

      loadCampaign();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: Partial<Campaign>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (id) {
        await updateCampaign(id, data);
      } else {
        await createCampaign(data as Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {id ? 'Редактирование кампании' : 'Создание новой кампании'}
          </h1>
          <CampaignForm
            initialData={campaign || undefined}
            isEditing={!!id}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignFormPage; 