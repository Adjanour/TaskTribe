import {
  Card,
  Avatar,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Project } from "../../types"; // Adjust the import path

export const ProjectCard = ({ project }: { project: Project }) => {
  // const { teams,fetchTeams } = useBackend();

  // useEffect(() => {
  //   fetchTeams();
  // }, []);

  // Find the team associated with the project (assuming a teamId property)
  // const projectTeam = teams.find((team) => team._id === project.teamId);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 mb-4"
      shadow="sm"
    >
      <CardHeader className="border-b justify-items-start align-middle gap-2">
        <Avatar
          src={`https://ui-avatars.com/api/?name=${project.name}&background=random&color=fff`}
        />
        <div className="flex flex-col">
          <span className="text-md text-balance">{project.name}</span>
          <div>
            <span className="text-sm text-default-500">
              {project.team?.name}
            </span>
            <span className="text-default-500 text-sm"> . </span>
            <span className="text-default-500 text-small">
              {new Date(project.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-2 px-4">
        <div className="mb-4">
          <span className="text-default-500">{project.description}</span>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex w-full justify-start mx-auto items-center space-x-4">
          <Button className="w-fit" color="primary">
            View Project
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
