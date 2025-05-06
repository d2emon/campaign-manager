import CharacterList from 'components/modules/Campaign/CharacterList';
import CampaignItem from 'components/ui/CampaignItem';
import { Campaign } from 'services/campaignApi';

interface CampaignDetailsProps {
  campaign: Campaign;
  isLoading: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const CampaignDetails = ({ campaign, isLoading, onDelete, onEdit }: CampaignDetailsProps) => {
  if (isLoading || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <CampaignItem
        className="mb-6"
        title={campaign.title}
        onDelete={onDelete}
        onEdit={onEdit}
      >
        <div className="mb-6">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {campaign.gameSystem}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700">{campaign.description}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Информация о кампании</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Максимум игроков</dt>
              <dd className="mt-1 text-sm text-gray-900">{campaign.maxPlayers}</dd>
            </div>
            {campaign.createdAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Создана</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(campaign.createdAt).toLocaleDateString()}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </CampaignItem>

      <CharacterList characters={campaign.npcs} />
    </div>
  );
};

export default CampaignDetails; 