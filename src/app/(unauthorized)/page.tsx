import { Logo } from '../components/logo/logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Footer } from './components/Footer';
import { HeaderText } from './components/HeaderText';
import { Hero } from './components/Hero';
import { HomeBanner } from './components/HomeBanner';
import { LandingLogo } from './components/LandingLogo';
import { MissionSection } from './components/MissionSection';
import { Suggestions } from './components/Suggestions';
import { TagBtn } from './components/TagBtn';
import VideoModal from './components/VideoModal';
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
