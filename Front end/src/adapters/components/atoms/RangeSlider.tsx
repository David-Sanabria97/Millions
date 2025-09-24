import  { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

interface IRangeSliderProps {
    step?: number;
    min?: number;
    max?: number;
    placeholder?: string;
    handleChangeValue: (event: Event, newValue: number[]) => void;
    icon?: React.ReactNode;

}


function valuetext(value: number) {
  return `${value}`;
}

const RangeSlider = (props:IRangeSliderProps) => {
    const { step = 1000, min, max, placeholder,icon, handleChangeValue } = props;

    const [value, setValue] = useState<number[]>([0, 0]);
    const handleChange = (event: Event, newValue: number[]) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (e:Event, newValue:number[]) => {
        handleChange(e, newValue);
        handleChangeValue(e, newValue);
    }
    
    return (
        <Box>
          <div>
                {icon} 
                <label>{placeholder}</label>

            </div>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
                <label> min {value[0]}</label>
                <label> max {value[1]}</label>
            </Box> 

            <Slider
                color='primary'
                value={value}
                onChange={handleChangeCommitted}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={min}
                step={step}
                max={max}
            />
            
        </Box>
            
    );
}

export default RangeSlider;