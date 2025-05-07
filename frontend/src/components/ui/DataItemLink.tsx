import { Copy } from 'react-feather';
import { Link } from 'react-router-dom';
import DataItem from './DataItem';

interface DataItemLinkProps {
  label?: string;
  url: string;
  withCopyButton?: boolean;
}

const DataItemLink = ({ label, url, withCopyButton=false }: DataItemLinkProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <DataItem label={label}>
      <div className="flex items-center gap-2 py-2">
        <Link 
          to={url}
          className="text-blue-500 hover:text-blue-600 hover:underline break-all"
        >
          {url}
        </Link>
        {withCopyButton && (
          <button
            onClick={handleCopy}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Копировать ссылку"
          >
            <Copy size={16} />
          </button>
        )}
      </div>
    </DataItem>
  );
};

export default DataItemLink;
