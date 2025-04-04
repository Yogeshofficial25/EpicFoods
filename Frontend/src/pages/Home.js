import Destinations from "../section/Destinations";
import Discover from "../section/Discover";
import HeroSection from "../components/HeroSection";

import ServiceCards from "../components/ServiceCards";
import OccasionFood from "../section/OccasionFood";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#FBC6A4]">
      <Navbar/>
      <HeroSection />
      <OccasionFood />
      <Discover />
      
      {/* <Destinations/> */}
      {/* <ServiceCards /> */}
      
     
    </div>
  );
};

export default Home;