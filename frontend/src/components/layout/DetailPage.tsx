import { ReactNode } from 'react';
import { Loader } from '@mantine/core';
import { Campaign } from 'modules/campaign/types/campaign';
import { Character } from 'modules/character/types/character';
import { Location } from 'modules/location/types/location';
import { Note } from 'modules/note/types/note';
import { Quest } from 'modules/quest/types/quest';
import Breadcrumbs from './Breadcrumbs';

interface DetailPageProps {
  breadcrumbs?: {
    campaign?: Campaign | null;
    character?: Character | null;
    location?: Location | null;
    quest?: Quest | null;
    note?: Note | null;
    isEdit?: boolean;
  };
  isNotFound?: boolean;
  isLoading?: boolean;
  title?: string;
  notFoundMessage?: string;
  onBack?: () => void;
  children?: ReactNode;
}

const DetailPage = ({
  breadcrumbs,
  isNotFound = false,
  isLoading = false,
  notFoundMessage = 'Элемент не найден',
  title,
  onBack,
  children,
}: DetailPageProps) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{notFoundMessage}</h1>
          <button
            onClick={onBack}
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
        {title && <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default DetailPage;
