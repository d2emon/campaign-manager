import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import { Location } from 'types/location';

interface LocationFormProps {
  initialData?: Location | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Location>) => void;
  onCancel?: () => void;
}

const LocationForm = ({
  initialData,
  isEditing = false,
  isLoading = false,
  onSubmit,
  onCancel
}: LocationFormProps) => {
  const { register, handleSubmit, reset } = useForm<Location>({
    defaultValues: initialData || undefined
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field
        id="name"
        label="Название"
        inputProps={{
          ...register('name', { required: true })
        }}
      />

      <Field
        id="type"
        label="Тип локации"
        inputProps={{
          ...register('type')
        }}
      />

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isEditing ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </form>
  );
};

export default LocationForm;
