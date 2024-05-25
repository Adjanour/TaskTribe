export interface Project {
  _id: string;
  name: string;
  description: string;
  team: Team;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: Date;
  startDate: Date;
  createdBy: string;
  assignedTo?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskGet{
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: Date;
  startDate: Date;
  createdBy: User;
  assignedTo: User[];
  assignedUserIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
}
