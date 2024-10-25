import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LandingLogo } from './components/LandingLogo';
import { MissionSection } from './components/MissionSection';
import { WhyUseSection } from './components/WhyUseSection';

const Entry = () => {
  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-full py-[32px] px-[16px] md:px-[56px]">
          <LandingLogo />
        </div>
        <Hero />
        <MissionSection />
        <WhyUseSection />
        <Footer />
      </div>
    </div>
  );
};

export default Entry;
