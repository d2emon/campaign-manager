import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Field from './Field';
import useAuth from '../hooks/useAuth';
import { getCampaign, createCampaign, updateCampaign } from '../services/campaignService';

const schema = yup.object({
  title: yup
    .string()
    .required('Название обязательно')
    .min(3, 'Минимум 3 символа'),
  description: yup
    .string()
    .required('Описание обязательно')
    .min(10, 'Минимум 10 символов'),
  gameSystem: yup
    .string()
    .required('Выберите игровую систему'),
  maxPlayers: yup
    .number()
    .min(1, 'Минимум 1 игрок')
    .max(10, 'Максимум 10 игроков')
    .required('Укажите максимальное количество игроков'),
});

type CampaignFormData = {
  title: string;
  description: string;
  gameSystem: string;
  maxPlayers: number;
};

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const loadCampaign = async () => {
        try {
          const campaign = await getCampaign(id);
          setValue('title', campaign.title);
          setValue('description', campaign.description);
          setValue('gameSystem', campaign.gameSystem);
          setValue('maxPlayers', campaign.maxPlayers);
        } catch (error) {
          console.error('Error loading campaign:', error);
          navigate('/dashboard');
        }
      };
      loadCampaign();
    }
  }, [id, setValue, navigate]);

  const onSubmit = async (data: CampaignFormData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (isEditing) {
        await updateCampaign(id!, { ...data, gmId: user.username });
      } else {
        await createCampaign({ ...data, gmId: user.username });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isEditing ? 'Редактирование кампании' : 'Создание новой кампании'}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Field
              error={errors.title}
              inputProps={register('title')}
              label="Название кампании"
            />

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                {...register('description')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary min-h-[150px]"
                placeholder="Опишите вашу кампанию..."
              />
              {errors.description && (
                <div className="mt-2 text-red-600">
                  {errors.description.message}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Игровая система
              </label>
              <select
                {...register('gameSystem')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              >
                <option value="">Выберите систему</option>
                <option value="dnd5e">Dungeons & Dragons 5e</option>
                <option value="pathfinder2e">Pathfinder 2e</option>
                <option value="warhammer">Warhammer Fantasy</option>
                <option value="custom">Другая система</option>
              </select>
              {errors.gameSystem && (
                <div className="mt-2 text-red-600">
                  {errors.gameSystem.message}
                </div>
              )}
            </div>

            <Field
              error={errors.maxPlayers}
              inputProps={register('maxPlayers', { valueAsNumber: true })}
              label="Максимальное количество игроков"
              type="number"
            />

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm; 