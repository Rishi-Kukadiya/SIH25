import React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = ({ 
  className,
  width = "100%", 
  height = "20px", 
  borderRadius = "4px", 
  shape = "rectangle",
  ...props 
}) => {
  const shapeClasses = shape === "circle" ? "rounded-full" : "";
  
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/30 to-muted bg-[length:200%_100%]",
        shapeClasses,
        className
      )}
      style={{
        width: width,
        height: height,
        borderRadius: shape === "rectangle" ? borderRadius : "50%"
      }}
      {...props}
    />
  );
};

const SkeletonCard = ({ className, ...props }) => (
  <div className={cn("p-4 space-y-3 bg-card rounded-lg border", className)} {...props}>
    <Skeleton height="16px" width="60%" />
    <Skeleton height="12px" width="40%" />
    <Skeleton height="12px" width="80%" />
  </div>
);

const SkeletonProfile = ({ className, ...props }) => (
  <div className={cn("p-4 space-y-3", className)} {...props}>
    <div className="flex items-center space-x-3">
      <Skeleton shape="circle" width="48px" height="48px" />
      <div className="space-y-2">
        <Skeleton height="16px" width="120px" />
        <Skeleton height="12px" width="80px" />
      </div>
    </div>
  </div>
);

export { Skeleton, SkeletonCard, SkeletonProfile };