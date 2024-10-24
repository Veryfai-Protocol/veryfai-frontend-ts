type StackedStarType = {
  size?: number;
  color: string;
  score: number;
};
const StackedStar = ({ size = 150, color, score }: StackedStarType) => {
  const scale = size / 200; // Assuming original SVGs are roughly 200x200

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background star */}
      <svg
        width={199 * scale}
        height={207 * scale}
        viewBox="0 0 199 207"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <path
          opacity="0.4"
          d="M118.889 1.50357C124.073 -0.939517 130.257 1.23529 132.77 6.3849L156.787 55.5987C157.249 56.5438 157.85 57.414 158.57 58.1802L196.082 98.0756C200.008 102.25 199.85 108.804 195.729 112.785L156.346 150.835C155.59 151.566 154.948 152.406 154.442 153.328L128.091 201.333C125.334 206.356 119.052 208.232 113.992 205.543L65.6346 179.845C64.7059 179.351 63.7082 179.001 62.6751 178.804L8.87695 168.577C3.24764 167.507 -0.477269 162.113 0.516441 156.469L10.0131 102.538C10.1955 101.502 10.2209 100.445 10.0884 99.4014L3.19011 45.0761C2.46829 39.3916 6.44772 34.182 12.1219 33.3832L66.3487 25.7492C67.3901 25.6026 68.4034 25.3001 69.3547 24.8517L118.889 1.50357Z"
          fill={`url(#paint0_linear_739_340_${size})`}
        />
        <defs>
          <linearGradient
            id={`paint0_linear_739_340_${size}`}
            x1="81.3041"
            y1="-19.4075"
            x2="100.748"
            y2="225.234"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Foreground star */}
      <svg
        width={194 * scale}
        height={203 * scale}
        viewBox="0 0 194 203"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <path
          d="M80.3038 201.724C75.1612 204.251 68.9422 202.178 66.3453 197.07L42.1376 149.456C41.661 148.518 41.046 147.658 40.3132 146.904L3.09258 108.592C-0.900286 104.482 -0.850068 97.9271 3.20532 93.8788L41.0086 56.1424C41.7529 55.3994 42.3811 54.5486 42.872 53.6186L67.8065 6.38088C70.4813 1.31341 76.7314 -0.664546 81.8346 1.94138L129.406 26.2333C130.343 26.7115 131.346 27.046 132.382 27.2255L185.013 36.3423C190.659 37.3204 194.472 42.6533 193.57 48.3121L185.168 101.062C185.002 102.1 184.994 103.158 185.144 104.199L192.737 157.071C193.551 162.743 189.658 168.017 183.997 168.908L131.233 177.217C130.194 177.381 129.186 177.7 128.242 178.164L80.3038 201.724Z"
          fill={`url(#paint0_linear_739_341_${size})`}
        />
        <defs>
          <linearGradient
            id={`paint0_linear_739_341_${size}`}
            x1="117.272"
            y1="221.7"
            x2="94.3087"
            y2="-17.6562"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Centered score */}
      {score !== undefined && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span
            className={`text-white font-primaryRegular`}
            style={{ fontSize: `${size * 0.25}px` }}
          >
            {score}
          </span>
        </div>
      )}
    </div>
  );
};

export default StackedStar;
