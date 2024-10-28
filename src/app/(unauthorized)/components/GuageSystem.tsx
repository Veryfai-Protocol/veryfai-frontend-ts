import React, { useMemo } from 'react';

const GaugeMeter = ({ value = 0 }) => {
  // Clamp value between -100 and 100
  const clampedValue = Math.max(-100, Math.min(100, value));
  
  // Convert value to angle (from -90 to 90 degrees)
  const angle = (clampedValue / 100) * 90;
  
  // SVG parameters
  const size = 300;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const needleLength = radius - strokeWidth; // Shorter needle

  // Calculate path for the gauge arc
  const arcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  // Helper function to convert polar coordinates to Cartesian
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const color = useMemo(() => {
    const actualScore = value ?? 0;
    const isNegative = actualScore < 0;
    return isNegative ? 'text-[#DD2727]' : 'text-[#1CA858]';
  }, [value]);

  // Calculate needle endpoint
  const needleEnd = polarToCartesian(center, center, needleLength, angle);

  // Calculate needle path for tapered effect
  const getNeedlePath = () => {
    const baseWidth = 12; // Width at the base
    const tipWidth = 2; // Width at the tip
    
    // Calculate points for the base of the needle
    const baseAngleRad = (angle - 90) * Math.PI / 180.0;
    const basePerpendicularAngle = baseAngleRad + Math.PI / 2;
    
    const baseLeft = {
      x: center + Math.cos(basePerpendicularAngle) * (baseWidth / 2),
      y: center + Math.sin(basePerpendicularAngle) * (baseWidth / 2)
    };
    
    const baseRight = {
      x: center - Math.cos(basePerpendicularAngle) * (baseWidth / 2),
      y: center - Math.sin(basePerpendicularAngle) * (baseWidth / 2)
    };

    // Calculate points for the tip of the needle
    const tipPerpendicularAngle = baseAngleRad + Math.PI / 2;
    const tipLeft = {
      x: needleEnd.x + Math.cos(tipPerpendicularAngle) * (tipWidth / 2),
      y: needleEnd.y + Math.sin(tipPerpendicularAngle) * (tipWidth / 2)
    };
    
    const tipRight = {
      x: needleEnd.x - Math.cos(tipPerpendicularAngle) * (tipWidth / 2),
      y: needleEnd.y - Math.sin(tipPerpendicularAngle) * (tipWidth / 2)
    };

    return `M ${baseLeft.x} ${baseLeft.y} 
            L ${tipLeft.x} ${tipLeft.y} 
            L ${tipRight.x} ${tipRight.y} 
            L ${baseRight.x} ${baseRight.y} Z`;
  };

  // Calculate positions for labels
  const labelRadius = radius + 20; // Position labels slightly outside the gauge
  const falsePos = polarToCartesian(center, center, labelRadius, -60);
  const neutralPos = polarToCartesian(center, center, labelRadius, -90);
  const truePos = polarToCartesian(center, center, labelRadius, 60);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <svg width={size} height={size} className="w-full mt-10">
        {/* Negative (Red) section */}
        <path
          d={arcPath(-90, -30, radius)}
          fill="none"
          stroke="#ef4444"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
        
        {/* Uncertain (Yellow) section */}
        <path
          d={arcPath(-30, 30, radius)}
          fill="none"
          stroke="#eab308"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
        
        {/* Positive (Green) section */}
        <path
          d={arcPath(30, 90, radius)}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />

        {/* Labels */}
        <text
          x={falsePos.x}
          y={falsePos.y}
          textAnchor="middle"
          fontSize="14"
          className="text-sm font-medium fill-gray-600"
        >
          F
        </text>
        <text
          x={neutralPos.x}
          y={neutralPos.y}
          textAnchor="middle"
          fontSize="14"
          className="text-sm font-medium fill-gray-600"
        >
          N
        </text>
        <text
          x={truePos.x}
          y={truePos.y}
          textAnchor="middle"
          fontSize="14"
          className="text-sm font-medium fill-gray-600"
        >
          T
        </text>

        {/* Tapered Needle */}
        <path
          d={getNeedlePath()}
          fill="#3b82f6"
          style={{
            transition: 'all 0.5s ease-out',
            transformOrigin: `${center}px ${center}px`
          }}
        />
        
        {/* Larger Center pin */}
        <circle
          cx={center}
          cy={center}
          r={12}
          fill="white"
          filter="url(#dropShadow)"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
      </svg>
      <h2 className="text-xl font-medium text-gray-gray4 mt-[-100px]">
        Credibility score : <span className={`${color}`}>{clampedValue}</span>
      </h2>
    </div>
  );
};

export default GaugeMeter;