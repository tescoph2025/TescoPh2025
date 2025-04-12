import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';

export function CustomCarousel() {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                <CarouselItem key={1}>
                    <div className="p-1">
                        <Card>
                            <CardContent className="flex items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{1}</span>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem key={2}>
                    <div className="p-1">
                        <Card>
                            <CardContent className="flex h-[500px] w-[500px] items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{2}</span>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                {/* {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>

                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))} */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
