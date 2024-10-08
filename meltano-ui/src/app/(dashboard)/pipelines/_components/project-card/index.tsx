"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Overlay } from "./overlay";
import { Footer } from "./footer";


interface PipelineCardProps {
    id: string;
    title: string;
    tap: string;
    target: string;
    creatorName: string;
    createdAt: Date;
    imageUrl: string;
    isFavourite: boolean;
};

export const PipelineCard = ({
    id,
    title,
    tap,
    target,
    creatorName,
    createdAt,
    imageUrl,
    isFavourite,
} : PipelineCardProps) => {

    const creatorLabel = "You";
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    return (
        <div>
            <Link href={`/pipeline/${id}`}>
            <div className="group aspect-[100/75] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image 
                        src={imageUrl} 
                        alt={title}
                        fill 
                        className="object-fit" 
                    />
                    <Overlay />
                </div>
                <Footer
                    isFavourite={isFavourite}
                    title={title}
                    tap={tap}
                    target={target}
                    creatorLabel={creatorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => {}}
                    disabled={true}
                />
            </div>
            </Link>
        </div>
    );
};

PipelineCard.Skeleton = function PipelineCardSkeleton() {
    return(
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"></Skeleton>
        </div>
    )
}