import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import OrderSummary from '../OrderSummary/OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary','Payment'];

export default function HorizontalLinearStepper() {
    const location = useLocation()
  const [activeStep, setActiveStep] = React.useState(0);
  const qurryParms = new URLSearchParams(location.search)
  const step = qurryParms.get("step")


  const handleNext = () => {
   

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
 
  };



  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


 

  return (
   <div className='p-7'>

<Box sx={{ width: '100%' }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        
      
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box >
            <Button className='bg-green-700'
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box  />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

          {step == 2? <DeliveryAddress/>:<OrderSummary/> }
          </Box>
        </React.Fragment>
      )}
    </Box>
   </div>
  );
}