// import React from "react";
// import {
//   Button,
//   Card,
//   Input,
//   Select,
//   DatePicker,
//   CardHeader,
//   Avatar,
//   Chip,
//   SelectedItems,
//   SelectItem,
// } from "@nextui-org/react";
// import { useBackend } from "@/features/TaskManagement/hooks/useBackend";
// import { User as Usertype } from "@/features/TaskManagement/types";
// import { now, getLocalTimeZone } from "@internationalized/date";
// import useAuth from "@/hooks/useAuth";

// type status = "pending" | "in-progress" | "completed"|undefined;

// export const TaskForm = () => {
//   const {user} = useAuth();
//   console.log("user");
//   console.log(user);
//   const { projects, users, createTask } = useBackend();
//   const [submiting, setSubmiting] = React.useState(false);
// //   const [assignedTo, setAssignedTo] = React.useState<Usertype[]>([]);

//   console.log(users);
//   console.log(projects);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     setSubmiting(true);
//     e.preventDefault();
//     const target = e.target as typeof e.target & {
//       title: { value: string };
//       description: { value: string };
//       status: { value: status };
//       dueDate: { value: Date };
//       startDate: { value: Date };
//       assignedTo: { value: Usertype[] };
//       projectId: { value: string };
//     };

//     console.log(target);
//     console.log(target.assignedTo.value);
//     console.log(target.status.value);
//     console.log(user ? user._id : "1")

//     const result = await createTask({
//       title: target.title.value,
//       description: target.description.value,
//       status: target.status.value,
//       dueDate: target.dueDate.value,
//       assignedTo: target.assignedTo.value,
//       startDate: target.startDate.value,
//       projectId: target.projectId.value,
//       createdAt: new Date(),
//         updatedAt: new Date(),
//         createdBy:  user?._id,
//     });
//     // Clear the form after successful submission (optional)
//     if (result){
//         setSubmiting(false);
//         alert("Task created successfully");
//         e.currentTarget.reset();
//     }
    
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <h2>Create Task</h2>
//       </CardHeader>
//       <form onSubmit={handleSubmit} className="w-full space-y-4 px-2">
//         <div className="form-control">
//           <Input
//             className="w-full"
//             id="title"
//             name="title"
//             type="text"
//             label="Title"
//             placeholder="Enter task title"
//           />
//         </div>
//         <div className="form-control">
//           <Input
//             className="w-full"
//             id="description"
//             name="description"
//             type="text"
//             label="Description"
//             placeholder="Enter task description"
//           />
//         </div>
//         <div className="form-control">
//             <Select label="Status" placeholder="Select status" name="status">
//                 <SelectItem key="pending" value="pending">Pending</SelectItem>
//                 <SelectItem key="in-progress" value="in-progress">In Progress</SelectItem>
//                 <SelectItem key="completed" value="completed">Completed</SelectItem>
//             </Select>
//         </div>
//         <div className="form-control">
//           <Select
//             name="assignedTo"
//             items={users}
//             label="Assigned to"
//             variant="bordered"
//             isMultiline={true}
//             selectionMode="multiple"
            
//             renderValue={(items: SelectedItems<Usertype>) => {
//               return (
//                 <div className="flex flex-wrap gap-2">
//                   {items.map((item) => (
//                     <Chip key={item.key}>{item.data?.displayName}</Chip>
//                   ))}
//                 </div>
//               );
//             }}
//           >
//             {(user) => (
//               <SelectItem key={user._id} textValue={user.displayName}>
//                 <div className="flex gap-2 items-center">
//                   <Avatar
//                     alt={user.displayName}
//                     className="flex-shrink-0"
//                     size="sm"
//                     src={user.avatar}
//                   />
//                   <div className="flex flex-col">
//                     <span className="text-small">{user.displayName}</span>
//                     <span className="text-tiny text-default-400">
//                       {user.email}
//                     </span>
//                   </div>
//                 </div>
//               </SelectItem>
//             )}
//           </Select>
//         </div>
//         <div className="form-control">
//           <DatePicker
//             label="Due Date"
//             name="dueDate"
//             variant="bordered"
//             hideTimeZone
//             showMonthAndYearPickers
//             defaultValue={now(getLocalTimeZone())}
//           />
//           <DatePicker
//             label="Start Date"
//             name="startDate"
//             variant="bordered"
//             hideTimeZone
//             showMonthAndYearPickers
//             defaultValue={now(getLocalTimeZone())}
//           />
//         </div>
//         <div className="form-control">
//           <Select name="projectId" label="Project" placeholder="Select project">
//             {projects.map((project) => (
//               <SelectItem key={project._id} value={project._id}>
//                 {project.name}
//               </SelectItem>
//             ))}
//             </Select>
//         </div>
//         <div className="form-control">
//           <Button spinner={submiting} type="submit" color="primary">
//             Create Task
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

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
import { useFormik } from "formik";
import { useBackend } from "@/features/TaskManagement/hooks/useBackend";
import { User as UserType } from "@/features/TaskManagement/types";
import { parseDateTime } from "@internationalized/date";
import useAuth from "@/hooks/useAuth";

type Status = "pending" | "in-progress" | "completed" | undefined;

interface FormValues {
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
  startDate: Date;
  assignedTo: string[];
  projectId: string;
}

// function formatDate(date:Date) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

export const TaskForm: React.FC = () => {
  const { user } = useAuth();
  const { projects, users, createTask } = useBackend();
  const [submitting, setSubmitting] = React.useState(false);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    return(e.target.value.split(","));
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
      status: undefined,
      dueDate: new Date(),
      startDate: new Date(),
      assignedTo: [],
      projectId: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const result = await createTask({
          ...values,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: user ? user._id : "1",
        });
        if (result) {
          alert("Task created successfully");
          formik.resetForm();
        }
      } catch (error) {
        console.error("Error creating task:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <h2>Create Task</h2>
      </CardHeader>
      <form onSubmit={formik.handleSubmit} className="w-full space-y-4 px-2">
        <div className="form-control">
          <Input
            className="w-full"
            id="title"
            name="title"
            type="text"
            label="Title"
            placeholder="Enter task title"
            value={formik.values.title}
            onChange={formik.handleChange}
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
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-control">
          <Select
            label="Status"
            placeholder="Select status"
            name="status"
            value={formik.values.status}
            onChange={(e) => formik.setFieldValue("status", e.target.value)}
          >
            <SelectItem key="pending" value="pending">
              Pending
            </SelectItem>
            <SelectItem key="in-progress" value="in-progress">
              In Progress
            </SelectItem>
            <SelectItem key="completed" value="completed">
              Completed
            </SelectItem>
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
            selectedKeys={formik.values.assignedTo}
            onChange={(e) =>
              formik.setFieldValue(
                "assignedTo",
                handleSelectionChange(e)
              )
            }
            renderValue={(items: SelectedItems<UserType>) => {
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
            // defaultValue={parseDateTime(now(getLocalTimeZone()).toString().replace('[UTC]',''))}
            value={parseDateTime(formik.values.dueDate.toISOString().split('T')[0])}
            onChange={(date) => formik.setFieldValue("dueDate", new Date(date.toString()))}
          />
          <DatePicker
            label="Start Date"
            name="startDate"
            variant="bordered"
            hideTimeZone
            showMonthAndYearPickers
            // defaultValue={parseDateTime(now(getLocalTimeZone()).toString())}
            value={parseDateTime(formik.values.startDate.toISOString().split('T')[0])}
            onChange={(date) => formik.setFieldValue("startDate", new Date(date.toString()))}
          />
        </div>
        <div className="form-control">
          <Select
            name="projectId"
            label="Project"
            placeholder="Select project"
            value={formik.values.projectId}
            onChange={(e) => formik.setFieldValue("projectId", e.target.value)}
          >
            {projects.map((project) => (
              <SelectItem key={project._id} value={project._id}>
                {project.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="form-control">
          <Button spinner={submitting} type="submit" color="primary">
            Create Task
          </Button>
        </div>
      </form>
    </Card>
  );
};



