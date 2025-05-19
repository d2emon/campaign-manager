import { Link } from 'react-router-dom';
import { Campaign } from 'modules/campaign/types/campaign';
import { Character } from 'modules/character/types/character';
import { Location } from 'modules/location/types/location';
import { Note } from 'modules/note/types/note';
import { Quest } from 'modules/quest/types/quest';

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface BreadcrumbsProps {
  campaign?: Campaign | null;
  character?: Character | null;
  location?: Location | null;
  quest?: Quest | null;
  note?: Note | null;
  isEdit?: boolean;
}

const Breadcrumbs = ({
  campaign,
  character,
  location,
  quest,
  note,
  isEdit,
}: BreadcrumbsProps) => {
  const breadcrumbs: BreadcrumbItem[] = [];

  if (campaign) {
    breadcrumbs.push({
      path: `/campaigns/${campaign.id}`,
      label: campaign.title,
    });
    if (character) {
      breadcrumbs.push({
        path: `/campaigns/${campaign.id}/characters/${character.id}`,
        label: character.name,
      });
    }
    if (location) {
      breadcrumbs.push({
        path: `/campaigns/${campaign.id}/locations/${location.slug}`,
        label: location.name,
      });
    }
    if (quest) {
      breadcrumbs.push({
        path: `/campaigns/${campaign.id}/quests/${quest.slug}`,
        label: quest.title,
      });
    }
    if (note) {
      breadcrumbs.push({
        path: `/campaigns/${campaign.id}/notes/${note.slug}`,
        label: note.title,
      });
    }
  }

  if (isEdit) {
    breadcrumbs.push({
      path: '',
      label: 'Редактирование',
    });
  }

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="px-4 py-2">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
            Главная
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900">{breadcrumb.label}</span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-gray-500 hover:text-gray-700"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
