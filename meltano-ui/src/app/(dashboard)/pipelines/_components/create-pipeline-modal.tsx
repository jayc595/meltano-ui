"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hash } from "lucide-react";
import { toast } from "sonner";
import { useCreatePipelineModal } from "../use-create-pipeline-modal";

export const CreatePipelineModal = () => {
  const maxCharLength = 30;
  const [open, setOpen] = useCreatePipelineModal(); // Same hook as used in Pipelines
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value.slice(0, maxCharLength)); // Ensure the value is sliced here
  };

  const handleClose = () => {
    setName("");
    setOpen(false); // Close the modal
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@TODO: Handle creation of meltano project.
    toast.success("Pipeline created successfully");
    handleClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Pipeline</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Hash className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              value={name}
              disabled={false}
              onChange={handleChange}
              required
              autoFocus
              minLength={3}
              maxLength={maxCharLength}
              placeholder="e.g general"
              className="pl-8 pr-8"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {maxCharLength - name.length}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
          Give your Meltano project a meaningful name. Pipelines facilitate the seamless extraction and loading of data, enabling efficient data integration and analysis.
          </p>
          <div className="flex justify-end">
            <Button disabled={false} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
