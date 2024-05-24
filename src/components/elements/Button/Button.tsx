import {Button} from "@nextui-org/react";

interface ButtonProps {
    className?: string;
    displayText: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
    radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
}

const ButtonX : React.FC<ButtonProps> = ({displayText,radius,color,variant,className}) => {
    return (
        <Button className={className} color={color?color:"primary"} radius={radius} variant={variant} >{displayText}</Button>
    )
}

export default ButtonX;