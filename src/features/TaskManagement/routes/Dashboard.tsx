// src/pages/dashboard.tsx
import  useAuth  from '@/hooks/useAuth';
import ProjectsComponent from '../components/Projects/Projects';
import { TaskForm } from '../components/Forms';
import { useBackend } from '../hooks/useBackend';
import { useEffect } from 'react';
import { TaskComponent } from '../components/Tasks/Tasks';
import { TaskTable } from '../components/TaskTable/TaskTable';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const {fetchUsers,fetchTeams,tasks,fetchTasks} = useBackend();


  useEffect(() => {
    fetchUsers();
    fetchTeams();
    fetchTasks();
  }, []);

  return (
    <div>
      <p>Dashboard</p>
      {currentUser ? (
        <p>Welcome, {currentUser.displayName}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
      <ProjectsComponent />
      <TaskComponent />
      <TaskForm />
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default Dashboard;
