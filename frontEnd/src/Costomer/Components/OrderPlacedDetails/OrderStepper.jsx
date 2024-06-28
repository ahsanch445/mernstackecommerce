import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
;

const steps = ['Placed', 'Order Confrimed', 'Sipped','Out of Delivery',"Delivered"];

export default function HorizontalLinearStepper() {
 
  const [activeStep, setActiveStep] = React.useState(0);
  
  return (
<>

<div className='py-7    flex justify-between'>

    
<div style={{ width: '100%'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
   
      
          return (
            <Step  key={index}  >
              <StepLabel >{label}</StepLabel>
             
            </Step>
          );
        })}
      </Stepper>
   
    
        
    </div>
    <h1  className='text-[#4b4bcad3] w-[20vw] flex justify-end text-sm font-bold cursor-pointer tracking-tight'>CANCEL ORDER</h1>

    

   </div>
   
</>
  );
}