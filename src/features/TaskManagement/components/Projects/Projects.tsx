// In some component file, e.g., ProjectsComponent.tsx

import React, { useEffect } from 'react';
import { ProjectCard } from '../ProjectCard';
import { useBackend } from '../../hooks/useBackend';

const ProjectsComponent: React.FC = () => {
  const { projects, fetchProjects } = useBackend();

  useEffect(() => {
     fetchProjects();
  }, []);


  return (
    <div className='flex flex-col flex-1 flex-wrap gap-3 my-2 sm:flex-row md:flex-row lg:flex-row'>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsComponent;
