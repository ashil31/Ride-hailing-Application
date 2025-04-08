import { FaMapMarkerAlt } from "react-icons/fa";

const LocationSearchPanel = ({ suggestions, onSelect }) => {
  return (
    <div>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSelect(suggestion)}
          className="flex items-center justify-start gap-3 border-2 border-gray-50 active:border-black p-3 rounded-xl my-2 cursor-pointer"
        >
          <div className="bg-[#eee] h-[2.3rem] w-[2.3rem] rounded-full flex items-center justify-center flex-shrink-0">
            <FaMapMarkerAlt className="text-gray-900 text-xl" />
          </div>
          <div className="font-medium flex-grow">
            <h4>{suggestion.description || suggestion}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
