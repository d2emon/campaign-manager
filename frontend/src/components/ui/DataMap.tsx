interface DataMapProps {
  title?: string;
  image?: string;
}

const DataMap = ({ title, image }: DataMapProps) => {
  return (
    <div>
      { title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2> }
      { image && <p className="mt-2 text-gray-600">{image}</p> }
    </div>
  );
};

export default DataMap;
