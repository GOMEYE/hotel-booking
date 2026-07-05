import ExclusiveOffers from "../components/ExclusiveOffers";
import FeatureDestination from "../components/FeaturedDestination";
import Hero from "../components/hero";
import NewsLetter from "../components/NewsLetter";
import Testimonials from "../components/Testimonials";
const Home = () => {
  return (
    <>
      <Hero />
      <FeatureDestination />
      <ExclusiveOffers />
      <Testimonials />
      <NewsLetter />
    </>
  );
};
export default Home;
