import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface FooterProps {
    title: string;
    tap: string;
    target: string;
    creatorLabel: string;
    createdAtLabel: string;
    isFavourite: boolean;
    onClick: () => void;
    disabled: boolean;
}

export const Footer = ({
    title,
    tap,
    target,
    creatorLabel,
    createdAtLabel,
    isFavourite,
    onClick,
    disabled,
}: FooterProps) => {
    disabled = false;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();

        if (disabled || loading) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/deletePipeline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName: title }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete pipeline');
            }

            console.log(`Pipeline '${title}' deleted successfully!`);
            onClick(); // Trigger any additional action
        } catch (error: any) {
            console.error('Error deleting pipeline:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncated">
                {tap} &#8594; {target}
            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncated">
                {createdAtLabel}
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <button
                disabled={disabled || loading}
                onClick={handleClick}
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
                    (disabled || loading) && "cursor-not-allowed opacity-75"
                )}
            >
                {loading ? (
                    <span>Deleting...</span>
                ) : (
                    <Trash2
                        className={cn(
                            "h-4 w-4",
                            isFavourite && "fill-blue-600 text-blue-600"
                        )}
                    />
                )}
            </button>
        </div>
    );
};
