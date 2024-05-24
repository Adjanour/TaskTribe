import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
import africoda from "@/assets/africoda.png";

interface NavbarProps {
  displayName: string|null|undefined;
  avatarUrl: string|null|undefined;
  onLogout: () => void;
}
export const NavbarX: React.FC<NavbarProps> = ({displayName,avatarUrl,onLogout}) => {
  return (
    <Navbar className="rounded-lg" isBordered position="sticky">
      <NavbarBrand>
        <Image alt="logo" radius="md" width={50} height={50} src={africoda} />
        <p className="font-bold text-inherit">Task Tribe</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive={window.location.href == "#"}>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={avatarUrl?avatarUrl:"https://avatars.dicebear.com/api/avataaars/jason-hughes.svg"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="faded">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{displayName}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem as="button" onClick={onLogout} key="logout" color="danger" className="bg-red-500">
                Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
