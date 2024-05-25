import {
  Card,
  Badge,
  Avatar,
  CardBody,
  CardHeader,
  CardFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useBackend } from "../../hooks/useBackend";
import { TaskGet as ITaskGet } from "../../types";
import { CiCircleInfo } from "react-icons/ci";
import { UserTwitterCard } from "../UserCard/UserCard";

const TaskCard = ({ task }: { task: ITaskGet }) => {
  // ToDO: Fetch users and other data in parent component and pass it as props
  const { users } = useBackend();

  task["assignedUserIds"] = task.assignedTo?.map((user) => user._id) || [];
  // Find the assigned user based on userId (assuming a userId property)
  const assignedUsers = users.filter((user) =>
    task.assignedUserIds?.includes(user._id)
  );

  const dueDateFormatted = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "primary";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex gap-2 items-center">          
            <span className="text-lg font-semibold">{task.title}</span>
            <Badge color={getStatusColor(task.status)} content={""}>
              <CiCircleInfo />
            </Badge>
          </div>
          <div>
            <Avatar className="w-6 h-6" src={`https://ui-avatars.com/api/?name=${task.createdBy.displayName}&background=random&color=fff`} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="text-md" style={{ fontSize: "0.9rem" }}>
        <div>
          <p>{task.description}</p>
        </div>

        <div className="flex gap-2 items-center">
          <label>Assignees: </label>
          {assignedUsers.map((user) => (
            <>
              <Popover key={user._id} placement="top">
                <PopoverTrigger>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${user.displayName}&background=random&color=fff`}
                />
                </PopoverTrigger>
                <PopoverContent>
                {/* <Avatar
                  key={user._id}
                  src={`https://ui-avatars.com/api/?name=${user.displayName}&background=random&color=fff`}
                /><p>{user.displayName}</p> */}
                <UserTwitterCard user={user} />
                /</PopoverContent>
              </Popover>
            </>
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
