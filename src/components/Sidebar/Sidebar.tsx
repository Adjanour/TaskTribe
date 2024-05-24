import { Card, Link, Spacer, Avatar,CardBody } from '@nextui-org/react';

//make sidebar responsive
export const Sidebar = () => {
  return (
    <Card className="hidden lg:flex sm:flex md:flex w-[15rem] h-full fixed top-0 left-0">
      <CardBody>
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4">
            <Avatar
              src="https://via.placeholder.com/40"
              size="lg"
              color="primary"
            />
            <p style={{ marginLeft: '10px' }}>User Name</p>
          </div>
          <Spacer y={1} />
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/dashboard" color="primary" >
              Dashboard
            </Link>
            <Link href="/projects" color="primary" >
              Projects
            </Link>
            <Link href="/tasks" color="primary" >
              Tasks
            </Link>
            <Link href="/teams" color="primary" >
              Teams
            </Link>
          </nav>
        </div>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
