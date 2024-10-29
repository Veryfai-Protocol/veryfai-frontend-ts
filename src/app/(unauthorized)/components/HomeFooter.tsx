import { PRODUCT_NAME } from '@/app/lib/constants/index';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';

export const HomeFooter = () => {
  return (
    <footer className="flex justify-center py-9 mt-auto">
      <div className="flex lg:gap-x-3 gap-x-2 items-center">
        <div className="flex items-center">
          <span className="lg:text-base mr-1 text-xs font-medium">
            Made with
          </span>
          <Heart size={12} color="red" fill="red" />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div>
          <span className="lg:text-base text-xs font-medium">
            {PRODUCT_NAME} {` © ${new Date().getFullYear()} `} . All Rights
            Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};
