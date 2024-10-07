"use client"

import React, { useEffect, useState } from 'react'

type Props = {}

const Pipelines = (props: Props) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the directory names from the API
        const fetchProjects = async () => {
          try {
            const response = await fetch('/api/getMeltanoProjects');
            const data = await response.json();
    
            if (response.ok) {
              setProjects(data.projects);
              console.log(data.projects);
            } else {
              throw new Error(data.error);
            }
          } catch (err) {
            // setError();
          }
        };
    
        fetchProjects();
      }, []);
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    

  return (
    <div>
      <h1>Meltano Projects</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  )
}

export default Pipelines