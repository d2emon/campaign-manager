import Button from './Button';
import Paper from './Paper';
import Spinner from './Spinner';

interface CampaignItemProps {
  className?: string;
  isLoading?: boolean;
  title?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

const CampaignItem = ({ className, title, onEdit, onDelete, children, isLoading }: CampaignItemProps) => {
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <Paper className={className}>
      <div className="flex justify-between items-start mb-6">
        { title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1> }
        <div className="flex space-x-4">
          <Button variant="primary" onClick={onEdit}>
            Редактировать
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </div>


      {children}
    </Paper>
  );
};

export default CampaignItem;
