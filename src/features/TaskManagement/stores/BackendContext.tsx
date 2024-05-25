import React, { createContext, useState, ReactNode } from 'react';
import axiosInstance from '@/lib/axios-istance';
import { Project, Task, TaskGet, Team, User } from '../types'; // Adjust the import path based on your project structure

const axios = axiosInstance;
export interface BackendContextType {
  projects: Project[];
  tasks: TaskGet[];
  teams: Team[];
  users: User[];
  fetchProjects: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchTeams: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  createProject: (project: Partial<Project>) => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<Task>;
  createTeam: (team: Partial<Team>) => Promise<void>;
  createUser: (user: Partial<User>) => Promise<void>;
  // Add other CRUD operations as needed
}

export const BackendContext = createContext<BackendContextType | undefined>(undefined);

export const BackendProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<TaskGet[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const fetchProjects = async () => {
    const response = await axios.get('/projects');
    setProjects(response.data);
  };

  const fetchTasks = async () => {
    const response = await axios.get('/tasks');
    setTasks(response.data);
  };

  const fetchTeams = async () => {
    const response = await axios.get('/teams');
    setTeams(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('/users');
    setUsers(response.data);
  };

  const createProject = async (project: Partial<Project>) => {
    const response = await axios.post('/projects', project);
    setProjects([...projects, response.data]);
  };

  const createTask  = async (task: Partial<Task>) => {
    const response = await axios.post('/tasks', task);
    setTasks([...tasks, response.data]);
    return response.data;
  };

  const createTeam = async (team: Partial<Team>) => {
    const response = await axios.post('/teams', team);
    setTeams([...teams, response.data]);
  };

  const createUser = async (user: Partial<User>) => {
    const response = await axios.post('/users', user);
    setUsers([...users, response.data]);
  };

  return (
    <BackendContext.Provider value={{
      projects,
      tasks,
      teams,
      users,
      fetchProjects,
      fetchTasks,
      fetchTeams,
      fetchUsers,
      createProject,
      createTask,
      createTeam,
      createUser,
    }}>
      {children}
    </BackendContext.Provider>
  );
};


