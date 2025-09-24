import { Box } from "@mui/material";
import logo from '../../../assets/original.png';

const Sidebar = () => {
    return (
        <Box sx={{ width: "100%", padding: 2, height: '100px', background:"black", textAlign:"center"} }>
             <img src={logo} alt="Logo" />
        </Box>
    );
}

export default Sidebar;