import { FunctionComponent } from "react";
import { setActiveStep } from "../main";

interface FormContentsProps{
  title: string,
  subtitle: string,
  children?: JSX.Element[] | JSX.Element,
  pageType: PageType,
  activeStep: number,
  setActiveStepState: Function,
  isMobile: boolean
}

export enum PageType{
  FIRST, // Don't show "Go Back" button 
  INNER, // Show both buttons
  LAST // Don't show "Next Step" button, instead show "Confirm" button
}

export default function FormContents({title, subtitle, children, pageType, activeStep, setActiveStepState, isMobile}: FormContentsProps){
  const nextStep = () => {
    if(activeStep == 1){
      let shouldReturn = false
      for(let elem of document.querySelectorAll(".formInput")){
        const emptyField = (elem as HTMLInputElement).value == ""
        const wrapper = elem.parentElement?.querySelector(".formHeaders")
        
        if(emptyField){
          (wrapper?.querySelector(".inputError") as HTMLElement).style.display = "block"
          elem.classList.add("error")

          shouldReturn = true;
        }
      }
      if(shouldReturn) return
    }

    setActiveStepState(activeStep + 1)
    setActiveStep(activeStep + 1)
  }

  const previousStep = () => {
    setActiveStepState(activeStep - 1)
    setActiveStep(activeStep - 1)
  }

  let temp
  switch(pageType){
    case PageType.FIRST:
      temp = (
        <div className={`buttonWrapper ${isMobile ? "mobile" : ""}`}>
          <span></span>
          <button className="confirmBtn" id="nextStep" onClick={nextStep}></button>
        </div>
      )
      break
    case PageType.INNER:
      temp = (
        <div className={`buttonWrapper ${isMobile ? "mobile" : ""}`}>
          <p className="backBtn" onClick={previousStep}>Go Back</p>
          <button className="confirmBtn" id="nextStep" onClick={nextStep}></button>
        </div>
      )
      break
    case PageType.LAST:
      temp = (
        <div className={`buttonWrapper ${isMobile ? "mobile" : ""}`}>
          <p className="backBtn" onClick={previousStep}>Go Back</p>
          <button className="confirmBtn" id="confirm" onClick={nextStep}></button>
        </div>
      )
      break
    default:
      throw new Error("Unrecognized PageType enum value")
  }
  const footer: JSX.Element = temp
  
  return isMobile ? 
  (
    <>
    <div className={`formWrapper ${isMobile ? "mobile" : ""}`}>
      <h1 className="formTitle">{title}</h1>
      <h2 className="formSubtitle">{subtitle}</h2>
      {children}
    </div>
    {footer}
    </>
  ) :
  (
    <div className={`formWrapper ${isMobile ? "mobile" : ""}`}>
      <h1 className="formTitle">{title}</h1>
      <h2 className="formSubtitle">{subtitle}</h2>
      {children}
      {footer}
    </div>
  )
}