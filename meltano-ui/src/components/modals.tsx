"use client";

import { CreatePipelineModal } from "@/app/(dashboard)/pipelines/_components/create-pipeline-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    return(
        <>
            <CreatePipelineModal/>
        </>
    )
}