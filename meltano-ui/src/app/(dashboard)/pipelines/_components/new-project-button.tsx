"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewProjectButtonProps {
    projId: string;
    disabled?: boolean;
    onNew?: () => void;
}

export const NewProjectButton = ({
    projId,
    disabled = false,  // Default to false if not provided
    onNew
}: NewProjectButtonProps) => {
    const router = useRouter();

    return (
        <button
            disabled={disabled} // Use the disabled prop here
            className={cn(
                "col-span-1 aspect-[100/75] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
            )}
            onClick={() => {
                if (onNew) {
                    onNew();
                }
            }}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-xs text-white font-light">New Project</p>
        </button>
    );
};
