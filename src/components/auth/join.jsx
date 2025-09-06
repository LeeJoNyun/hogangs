import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Join = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <div>
      {step === 1 && <Step1 onNext={nextStep} onClose={onClose} />}
      {step === 2 && <Step2 onNext={nextStep} onClose={onClose} />}
      {step === 3 && <Step3 onClose={onClose} />}
    </div>
  );
};

export default Join;
