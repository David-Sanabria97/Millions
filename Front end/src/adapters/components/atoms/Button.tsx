import { Button as MuiButton } from "@mui/material";
import "./Atoms.scss"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    color?: 'primary' | 'secondary';
}


const Button = (props:ButtonProps) => {
    const { children, onClick, color } = props;
  return (  
    <MuiButton
        className="Button"
        onClick={onClick}
        variant="contained"
        color={color || 'primary'}
    >
      {children}
    </MuiButton>
  );
}

export default Button;  