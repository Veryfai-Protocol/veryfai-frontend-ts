import { Button } from '@/app/components/ui/button';

export const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="bg-transparent hover:bg-transparent shadow-none border-none outline-none"
  >
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_419_1477)">
        <rect
          x="0.0117188"
          width="40"
          height="40"
          rx="20"
          fill="#121212"
          fillOpacity="0.4"
        />
        <path
          d="M12.6278 26.1161C12.1397 26.6042 12.1397 27.3957 12.6278 27.8839C13.116 28.372 13.9075 28.372 14.3956 27.8839L28.3956 13.8839C28.8838 13.3957 28.8838 12.6043 28.3956 12.1161C27.9075 11.628 27.116 11.628 26.6278 12.1161L12.6278 26.1161Z"
          fill="white"
        />
        <path
          d="M14.3956 12.1161C13.9075 11.628 13.116 11.628 12.6278 12.1161C12.1397 12.6043 12.1397 13.3957 12.6278 13.8839L26.6279 27.8839C27.116 28.372 27.9075 28.372 28.3956 27.8839C28.8838 27.3957 28.8838 26.6042 28.3956 26.1161L14.3956 12.1161Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_419_1477"
          x="-3.98828"
          y="-4"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_419_1477"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_419_1477"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </Button>
);
