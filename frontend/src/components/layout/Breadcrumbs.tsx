import { Link } from 'react-router-dom';
import { Campaign } from 'types/campaign';
import { Character } from 'types/character';
import { Location } from 'types/location';

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface BreadcrumbsProps {
  campaign?: Campaign | null;
  character?: Character | null;
  location?: Location | null;
  isEdit?: boolean;
}

const Breadcrumbs = ({ campaign, character, location, isEdit }: BreadcrumbsProps) => {
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
        path: `/campaigns/${campaign.id}/locations/${location.id}`,
        label: location.name,
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
