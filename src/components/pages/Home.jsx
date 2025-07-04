import HeroSection from '@/components/organisms/HeroSection';
import PopularCategories from '@/components/organisms/PopularCategories';
import FeaturedServices from '@/components/organisms/FeaturedServices';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularCategories />
      <FeaturedServices />
    </div>
  );
};

export default Home;