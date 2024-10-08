import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreatePipelineModal = () => useAtom(modalState);
