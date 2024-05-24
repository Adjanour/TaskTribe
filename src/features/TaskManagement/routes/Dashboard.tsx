// src/pages/dashboard.tsx
import  useAuth  from '@/hooks/useAuth';
import ProjectsComponent from '../components/Projects/Projects';
import { TaskForm } from '../components/Forms';
import { useBackend } from '../hooks/useBackend';
import { useEffect } from 'react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const {fetchUsers,fetchTeams} = useBackend();

  useEffect(() => {
    fetchUsers();
    fetchTeams();
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
      <TaskForm />
    </div>
  );
};

export default Dashboard;
