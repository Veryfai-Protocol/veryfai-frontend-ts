import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';

interface SourceInfo {
  article_url: string;
  stance: string;
}

interface AvatarGroupProps {
  responseDict: Record<string, SourceInfo>;
  limit?: number;
  stance: string;
}

type SourceEntry = [string, SourceInfo];

export default function AvatarGroup({
  responseDict,
  limit = 3,
  stance,
}: AvatarGroupProps) {
  // Convert dictionary to array and slice for visible sources
  let filteredSources: SourceEntry[] = [];
  if (responseDict) {
    filteredSources = Object.entries(responseDict).filter(
      ([, sourceInfo]) => sourceInfo.stance === stance
    ) as SourceEntry[];
  }

  const visibleSources = filteredSources.slice(0, limit);
  const remainingCount = Math.max(filteredSources.length - limit, 0);

  return (
    <div className="flex items-center">
      {visibleSources.map(([sourceName], index) => (
        <TooltipProvider key={sourceName}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                className={`w-10 h-10 border-2 border-background ${
                  index !== 0 ? '-ml-5' : ''
                }`}
              >
                <AvatarImage src={`/api/placeholder/32/32`} alt={sourceName} />
                <AvatarFallback className="">
                  {sourceName.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sourceName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {remainingCount > 0 && (
        <div className="w-10 h-10 text-muted-foreground rounded-full -ml-1 flex items-center justify-center text-sm font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
