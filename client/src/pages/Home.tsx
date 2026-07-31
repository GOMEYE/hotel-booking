import ExclusiveOffers from "../components/ExclusiveOffers";
import FeatureDestination from "../components/FeaturedDestination";
import Hero from "../components/hero";
import NewsLetter from "../components/NewsLetter";
import RecommendedHotels from "../components/RecommendedHotels";
import Testimonials from "../components/Testimonials";
const Home = () => {
  return (
    <>
      <Hero />
      <RecommendedHotels />
      <FeatureDestination />
      <ExclusiveOffers />
      <Testimonials />
      <NewsLetter />
    </>
  );
};
export default Home;
