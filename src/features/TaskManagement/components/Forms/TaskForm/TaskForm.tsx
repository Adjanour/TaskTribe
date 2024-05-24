import React from "react";
import {
  Button,
  Card,
  Input,
  Select,
  DatePicker,
  CardHeader,
  Avatar,
  Chip,
  SelectedItems,
  SelectItem,
} from "@nextui-org/react";
import { useBackend } from "@/features/TaskManagement/hooks/useBackend";
import { User as Usertype } from "@/features/TaskManagement/types";
import { now, getLocalTimeZone } from "@internationalized/date";
import useAuth from "@/hooks/useAuth";

type status = "pending" | "in-progress" | "completed"|undefined;

export const TaskForm = () => {
  const {user} = useAuth();
  console.log("user");
  console.log(user);
  const { projects, users, createTask } = useBackend();
  const [submiting, setSubmiting] = React.useState(false);
//   const [assignedTo, setAssignedTo] = React.useState<Usertype[]>([]);

  console.log(users);
  console.log(projects);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmiting(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      status: { value: status };
      dueDate: { value: Date };
      startDate: { value: Date };
      assignedTo: { value: Usertype[] };
      projectId: { value: string };
    };

    console.log(target);
    console.log(target.assignedTo.value);
    console.log(target.status.value);
    console.log(user ? user._id : "1")

    const result = await createTask({
      title: target.title.value,
      description: target.description.value,
      status: target.status.value,
      dueDate: target.dueDate.value,
      assignedTo: target.assignedTo.value,
      startDate: target.startDate.value,
      projectId: target.projectId.value,
      createdAt: new Date(),
        updatedAt: new Date(),
        createdBy:  user?._id,
    });
    // Clear the form after successful submission (optional)
    if (result){
        setSubmiting(false);
        alert("Task created successfully");
        e.currentTarget.reset();
    }
    
  };

  return (
    <Card>
      <CardHeader>
        <h2>Create Task</h2>
      </CardHeader>
      <form onSubmit={handleSubmit} className="w-full space-y-4 px-2">
        <div className="form-control">
          <Input
            className="w-full"
            id="title"
            name="title"
            type="text"
            label="Title"
            placeholder="Enter task title"
          />
        </div>
        <div className="form-control">
          <Input
            className="w-full"
            id="description"
            name="description"
            type="text"
            label="Description"
            placeholder="Enter task description"
          />
        </div>
        <div className="form-control">
            <Select label="Status" placeholder="Select status" name="status">
                <SelectItem key="pending" value="pending">Pending</SelectItem>
                <SelectItem key="in-progress" value="in-progress">In Progress</SelectItem>
                <SelectItem key="completed" value="completed">Completed</SelectItem>
            </Select>
        </div>
        <div className="form-control">
          <Select
            name="assignedTo"
            items={users}
            label="Assigned to"
            variant="bordered"
            isMultiline={true}
            selectionMode="multiple"
            
            renderValue={(items: SelectedItems<Usertype>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.displayName}</Chip>
                  ))}
                </div>
              );
            }}
          >
            {(user) => (
              <SelectItem key={user._id} textValue={user.displayName}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.displayName}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.displayName}</span>
                    <span className="text-tiny text-default-400">
                      {user.email}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        <div className="form-control">
          <DatePicker
            label="Due Date"
            name="dueDate"
            variant="bordered"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
          <DatePicker
            label="Start Date"
            name="startDate"
            variant="bordered"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
        </div>
        <div className="form-control">
          <Select name="projectId" label="Project" placeholder="Select project">
            {projects.map((project) => (
              <SelectItem key={project._id} value={project._id}>
                {project.name}
              </SelectItem>
            ))}
            </Select>
        </div>
        <div className="form-control">
          <Button spinner={submiting} type="submit" color="primary">
            Create Task
          </Button>
        </div>
      </form>
    </Card>
  );
};


