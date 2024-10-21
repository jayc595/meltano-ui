"use client";

import React, { useEffect, useState } from "react";
import { NewProjectButton } from "./_components/new-project-button";
import { PipelineCard } from "./_components/project-card";
import { useCreatePipelineModal } from "./use-create-pipeline-modal";
import { CreatePipelineModal } from "./_components/create-pipeline-modal";

type Project = {
  name: string;
  createdAt: Date;
};

type Props = {};

const Pipelines = (props: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useCreatePipelineModal();  // Make sure this is working properly

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/getMeltanoProjects");
        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects);
        } else {
          setProjects([]);
          throw new Error(data.error);
        }
      } catch (err) {
        // Handle error
        setError("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewProjectButton onNew={() => {setOpen(true);  }} projId={"1234"} />
        {projects?.length > 0 ? (
          projects.map((project, index) => (
            <PipelineCard
              key={index}
              id={"1"}
              tap={"test"}
              target={"test"}
              title={project.name}
              creatorName="You"
              isFavourite={false}
              createdAt={project.createdAt}
              imageUrl=""
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Pipelines;
