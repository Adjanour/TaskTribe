import React from 'react'
import {Table, TableHeader, TableColumn,Button,Spinner, TableBody,TableRow,TableCell, Avatar, AvatarGroup, button, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import { Task, TaskGet, User } from '../../types';
import { UserTwitterCard } from '../UserCard/UserCard';

export const TaskTable = ({tasks}:{tasks:TaskGet[]}) =>{
    const [isLoading, setIsLoading] = React.useState(false);
    

    // format datats like this:2024-05-25T09:36:49.198Z
    const formatDate = (date:string) => {
        // date in format Sat May 25 2024 6:36:49 GMT+0300 (East Africa Time)
        return new Date(date).toLocaleTimeString('en-GB', {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
    }
    const generateAvatar = (user:User) => {

       return <Popover>
            <PopoverTrigger>
                <Avatar className='w-8 h-8' src={`https://ui-avatars.com/api/?name=${user.displayName}&background=random&color=fff`} />
            </PopoverTrigger>
            <PopoverContent>
                <UserTwitterCard user={user} />
            </PopoverContent>
        </Popover>

      }


    console.log(tasks)
    return (
        <Table
            isHeaderSticky
      aria-label="Example table with client side sorting"
      bottomContent={
         !isLoading ? (
          <div className="flex w-full justify-center">
            <Button isDisabled={isLoading} variant="flat">
              {isLoading && <Spinner color="white" size="sm" />}
              Load More
            </Button>
          </div>
        ) : null
      }
      classNames={{
        base: "max-h-[520px] overflow-scroll",
        table: "min-h-[420px]",
      }}
        >
            <TableHeader>
                <TableColumn key="name">Task</TableColumn>
                <TableColumn key="status">Status</TableColumn>
                <TableColumn key="dueDate">Due Date</TableColumn>
                <TableColumn key="assignedTo">Assigned To</TableColumn>
                <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
                isLoading={isLoading}
                items={tasks}
                loadingContent={<Spinner label='Loading tasks...' />}
                >
                {tasks.map((task) => (
                    <TableRow key={task._id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>{formatDate(task.dueDate.toLocaleString())}</TableCell>
                        <TableCell><AvatarGroup className='w-fit'>{task.assignedTo?.map((user) => generateAvatar(user))}</AvatarGroup></TableCell>
                        <TableCell>
                            <Button size="sm" variant="flat">
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}