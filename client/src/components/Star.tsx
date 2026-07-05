import { assets } from "../assets/assets";

interface StarProps {
  rating?: number;
}

const Star = ({ rating = 4 }: StarProps) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => {
          const isFilled = rating > index;

          return (
            <img
              key={index}
              // Uses filled asset or blank asset based on rating condition
              src={isFilled ? assets.starIconFilled : assets.starIconOutlined}
              alt={isFilled ? "Filled Star" : "Empty Star"}
              className="w-4 h-4 inline-block mx-0.5"
            />
          );
        })}
    </>
  );
};

export default Star;
