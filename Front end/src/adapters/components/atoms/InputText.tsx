

import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

interface InputTextProps {
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    icon?: React.ReactNode;
}
const InputText = (props:InputTextProps) => {

    const { placeholder, value, onChange, name, icon  } = props;

    return (<Box>
            <div>
                {icon} 
                <label>{placeholder}</label>
            </div>
            <TextField 
                style={{width:"100%" }}
                fullWidth 
                variant="outlined"      
                name={name} 
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
            </Box>);
}

export default InputText;