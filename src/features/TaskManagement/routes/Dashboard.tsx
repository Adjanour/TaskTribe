// src/pages/dashboard.tsx
import  useAuth  from '@/hooks/useAuth';
import ProjectsComponent from '../components/Projects/Projects';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <p>Dashboard</p>
      {currentUser ? (
        <p>Welcome, {currentUser.displayName}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
      <ProjectsComponent />
    </div>
  );
};

export default Dashboard;
