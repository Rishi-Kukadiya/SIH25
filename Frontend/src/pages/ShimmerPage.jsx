import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton, SkeletonCard, SkeletonProfile } from '@/components/Skeleton';

const ShimmerPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <Skeleton height="32px" width="200px" />
          <Skeleton height="16px" width="300px" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            {/* Navigation Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Skeleton height="24px" width="150px" />
                  <div className="flex space-x-2">
                    <Skeleton height="32px" width="32px" shape="circle" />
                    <Skeleton height="32px" width="32px" shape="circle" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="text-center p-3 rounded-lg">
                      <Skeleton height="16px" width="24px" className="mx-auto mb-2" />
                      <Skeleton height="20px" width="20px" className="mx-auto" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lecture Cards */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton height="24px" width="120px" />
                  <Skeleton height="16px" width="80px" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </CardContent>
            </Card>

            {/* Table Section */}
            <Card>
              <CardHeader>
                <Skeleton height="24px" width="100px" />
                <div className="flex space-x-4">
                  <Skeleton height="16px" width="60px" />
                  <Skeleton height="16px" width="80px" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 pb-3 border-b">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} height="14px" width="60%" />
                    ))}
                  </div>
                  {/* Table Rows */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-6 gap-4 py-2">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <Skeleton key={j} height="16px" width="80%" />
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <SkeletonProfile />
              </CardContent>
            </Card>

            {/* Calendar Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton height="20px" width="80px" />
                  <div className="flex space-x-1">
                    <Skeleton height="24px" width="24px" shape="circle" />
                    <Skeleton height="24px" width="24px" shape="circle" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} height="12px" width="12px" className="mx-auto" />
                  ))}
                </div>
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <Skeleton key={i} width="24px" height="24px" shape="circle" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Groups Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton height="20px" width="20px" className="mr-2" />
                  <Skeleton height="20px" width="60px" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg">
                    <Skeleton shape="circle" width="24px" height="24px" />
                    <div className="flex-1 space-y-1">
                      <Skeleton height="14px" width="70%" />
                      <Skeleton height="12px" width="50%" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Students Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton height="20px" width="20px" className="mr-2" />
                  <Skeleton height="20px" width="80px" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg">
                    <div className="relative">
                      <Skeleton shape="circle" width="40px" height="40px" />
                      {i === 0 && (
                        <Skeleton 
                          shape="circle" 
                          width="20px" 
                          height="20px" 
                          className="absolute -top-1 -right-1" 
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Skeleton height="14px" width="60%" />
                      <Skeleton height="12px" width="40%" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerPage;