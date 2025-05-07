import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Campaign } from 'types/campaign';
import Breadcrumbs from './Breadcrumbs';
import Spinner from '../ui/Spinner';

interface DetailPageProps {
  backUrl?: string;
  breadcrumbs?: {
    campaign?: Campaign | null;
  };
  isNotFound?: boolean;
  isLoading?: boolean;
  title?: string;
  notFoundMessage?: string;
  children?: ReactNode;
}

const DetailPage = ({
  backUrl = '/',
  breadcrumbs,
  isNotFound = false,
  isLoading = false,
  notFoundMessage = 'Элемент не найден',
  title,
  children,
}: DetailPageProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{notFoundMessage}</h1>
          <button
            onClick={() => navigate(backUrl)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>}
        {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
        {children}
      </div>
    </div>
  );
};

export default DetailPage;
