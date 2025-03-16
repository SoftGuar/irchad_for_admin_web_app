
interface ItemsListProps {
    title: string,
    items: { title: string; description: string }[];
  }


const ItemsList: React.FC<ItemsListProps> = ({ title, items }) => {
  return (
    <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-md mx-6 my-6">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-[#464646] p-4 rounded-md">
            <h3 className="text-white font-semibold">{item.title}</h3>
            <p className="text-white text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;