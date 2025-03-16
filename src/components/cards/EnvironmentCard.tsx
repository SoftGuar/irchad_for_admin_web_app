
interface EnvironmentCardProps {
    image:string,
    title: string,
    description: string,
    routes: string[],
    pois: string[]
}
const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ image, title, description, routes, pois }) => {
    return (
      <div className="bg-[rgb(70,70,70)] p-6 px-10 rounded-lg shadow-md flex justify-between">
        <div className="flex flex-col">
          <img src={image} alt={title} className="w-40 h-40 rounded-md" />
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm mb-2">{description}</p>
        </div>
        <div className="text-white">
          <h4 className="font-semibold">Favorite Routes</h4>
          <ul className="text-gray-400 text-sm list-disc ml-4">
            {routes.map((route, index) => (
              <li key={index}>{route}</li>
            ))}
          </ul>
        </div>
        <div className="text-white">
          <h4 className="font-semibold">Favorite POIs</h4>
          <ul className="text-gray-400 text-sm list-disc ml-4">
            {pois.map((poi, index) => (
              <li key={index}>{poi}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default EnvironmentCard;