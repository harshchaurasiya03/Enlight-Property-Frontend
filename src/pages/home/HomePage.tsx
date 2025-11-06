import Navbar from '../../components/Navbar';
import HeroSearch from '../../components/home/HeroSearch';
import FeaturedProjects from '../../components/home/FeaturedProjects';
import PropertiesByLocation from '../../components/home/PropertiesByLocation';
import PropertiesForSale from '../../components/home/PropertiesForSale';
import PropertiesForRent from '../../components/home/PropertiesForRent';
import FeaturedAgents from '../../components/home/FeaturedAgents';
import NewsSection from '../../components/home/NewsSection';
import Footer from '../../components/Footer';
import PropertyCarousel from '../../components/home/PropertyCarousel';
import TrendingYoutube from '../../components/home/TrendingYoutube';
import GoogleReview from '../../components/home/GoogleReview';
import SplitCard from '../../components/home/SplitCard';
import RentToOwn from '../../components/home/RentToOwn';
import FutureProjects from '../../components/home/FutureProjects';
import NewHomes from '../../components/home/NewHomes';
import MostPopular from '../../components/home/MostPopular';
import MustSellProperty from '../../components/home/MustSellProperty'


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSearch />
      <FeaturedProjects />
      <PropertyCarousel />
      <SplitCard/>
      <RentToOwn/>
      <FutureProjects/>
      <NewHomes/>
      <MostPopular/>
      <GoogleReview/>
      <MustSellProperty/>
      <TrendingYoutube/>
      <PropertiesByLocation />
      <PropertiesForSale />
      <PropertiesForRent />
      <FeaturedAgents />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
