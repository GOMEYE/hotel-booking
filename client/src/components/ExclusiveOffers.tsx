import { assets, exclusiveOffers } from "../assets/assets";
import Title from "./Title";

const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title
          title="Exclusive Offers"
          subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod deleniti corporis error quo ad, repellat aliquid! Magni aliquam aut asperiores in eius"
          align="left"
        />
        <button className="group flex items-center cursor-pointer gap-2 font-medium">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arros icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center pb-4"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div>
              <p className="text-2xl font-medium font-playfair">{item.title}</p>
              <p>{item.description}</p>
              <p className="text-xs text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>
            </div>
            <button>
              View Offers
              <img
                src={assets.arrowIcon}
                alt="arrow icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
