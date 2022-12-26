interface FormStepProps {
    step: Number
    subtitle: String,
    isMobile: boolean
}

export default function FormStep({step, subtitle, isMobile} : FormStepProps) {
    return isMobile ? (
    <div className="formStepWrapper">
        <div className="step" id={`step${step}`}>{step.toString()}</div>
    </div>
    ) :
    (
        <div>
            <div className="step" id={`step${step}`}>{step.toString()}</div>
            
            <div className="stepText">
                <h1 className="stepTitle">STEP {step.toString()}</h1>
                <p className="stepSubtitle">{subtitle}</p>
            </div>
        </div>
    )
}