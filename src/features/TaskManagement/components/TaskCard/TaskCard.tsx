import { Card, Badge, Avatar,CardBody,CardHeader,CardFooter } from '@nextui-org/react';
import { useBackend } from '../../hooks/useBackend';
import { Task as ITask } from '../../types';

interface Task extends ITask {
    assignedUserIds: string[];
  }

const TaskCard = ({ task }:{task:Task}) => {
    // ToDO: Fetch users and other data in parent component and pass it as props
  const { users } = useBackend();
    
  
  
  task.assignedUserIds = task.assignedTo?.map((user) => user._id) || [];
  // Find the assigned user based on userId (assuming a userId property)
  const assignedUsers = users.filter((user) => task.assignedUserIds.includes(user._id));

  const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  }
  return (
    <Card >
        <CardHeader>
            <div className="flex items-center gap-2">
                <Badge color={getStatusColor(task.status)}>{task.status}</Badge>
                <span>{task.title}</span>
            </div>
        </CardHeader>
        <CardBody>
            <p>{task.description}</p>
            <div className="flex gap-2">
                {assignedUsers.map((user) => (
                <Avatar key={user._id} src={`https://ui-avatars.com/api/?name=${user.displayName}&background=random&color=fff`} />
                ))}
            </div>
        </CardBody>
        <CardFooter>
            <p>Due: {dueDateFormatted}</p>
            <p>Status: {task.status}</p>
        </CardFooter>
    </Card>
    
  );
};

export default TaskCard;


