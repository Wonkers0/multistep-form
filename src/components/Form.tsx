import {useState} from "react"
import BillingCard, { ADVANCED, ARCADE, BillingType, PlanType, PRO } from "./BillingCard"
import BillingSlider from "./BillingSlider"
import { setActiveStep } from "../main"
import Input from "./Input"
import AddOn from "./AddOn"
import FormContents, { PageType } from "./FormContents"

export interface AddOnIntf{
    title: string,
    cost: number
}

interface FormProps{
    isMobile: boolean
}

export default function Form({isMobile}: FormProps) {
    const [activeStep, setActiveStepState] = useState(1)
    const [billingType, setBillingType] = useState(BillingType.MONTHLY)
    const [billingPlan, setBillingPlan] = useState(ARCADE)
    const [addOns, setAddOns] = useState([] as AddOnIntf[])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("")

    switch(activeStep){
        case 1:
            return (
                <FormContents title="Personal info" subtitle="Please provide your name, email address, and phone number." pageType={PageType.FIRST} activeStep={activeStep} setActiveStepState={setActiveStepState} isMobile={isMobile}>
                    <Input title="Name" placeholder="e.g. Stephen King" value={name} storeState={setName}></Input>
                    <Input title="Email Address" placeholder="e.g. stephenking@lorem.com" value={email} storeState={setEmail}></Input>
                    <Input title="Phone Number" placeholder="e.g. +1 234 567 890" value={phoneNum} storeState={setPhoneNum}></Input>
                </FormContents>
            )
        case 2:
            return (
                <FormContents title="Select your plan" subtitle="You have the option of monthly or yearly billing" pageType={PageType.INNER} activeStep={activeStep} setActiveStepState={setActiveStepState} isMobile={isMobile}>
                    <div className={`planWrapper ${isMobile ? "mobile" : ""}`}>
                        <BillingCard cardInfo={ARCADE} billingType={billingType} billingPlan={billingPlan.plan} setBillingPlan={setBillingPlan} isMobile={isMobile} />
                        <BillingCard cardInfo={ADVANCED} billingType={billingType} billingPlan={billingPlan.plan} setBillingPlan={setBillingPlan} isMobile={isMobile} />
                        <BillingCard cardInfo={PRO} billingType={billingType} billingPlan={billingPlan.plan} setBillingPlan={setBillingPlan} isMobile={isMobile} />
                    </div>

                    <BillingSlider billingState={setBillingType} billingType={billingType} />
                </FormContents>
            )
        case 3:
            return (
                <FormContents title="Pick add-ons" subtitle="Add-ons help enhance your gaming experience." pageType={PageType.INNER} activeStep={activeStep} setActiveStepState={setActiveStepState} isMobile={isMobile}>
                    <div className="addOnWrapper">
                        <AddOn title="Online service" description="Access to multiplayer games" cost={1} billingType={billingType} addOns={addOns} setAddOns={setAddOns}/>
                        <AddOn title="Larger storage" description="Extra 1TB of cloud save" cost={2} billingType={billingType} addOns={addOns} setAddOns={setAddOns} />
                        <AddOn title="Customizable Profile" description="Custom theme on your profile" cost={2} billingType={billingType} addOns={addOns} setAddOns={setAddOns} />
                    </div>
                </FormContents>
            )
        case 4:
            let totalCost = billingType == BillingType.MONTHLY ? billingPlan.monthlyCost : billingPlan.monthlyCost * 10
            let addOnElements: JSX.Element[] = []
            for(let addOn of addOns){
                addOnElements.push((
                    <div>
                        <p className="addOnTitle">{addOn.title}</p>
                        <p className="addOnCost">+${billingType == BillingType.MONTHLY ? addOn.cost : addOn.cost * 10}/{billingType == BillingType.MONTHLY ? "mo" : "yr"}</p>
                    </div>
                ))
                totalCost += billingType == BillingType.MONTHLY ? addOn.cost : addOn.cost * 10
            } 

            return (
                <FormContents title="Finishing up" subtitle="Double-check everything looks OK before confirming." pageType={PageType.LAST} activeStep={activeStep} setActiveStepState={setActiveStepState} isMobile={isMobile}>
                    <div className="summaryWrapper">
                        <div className="planDetails">
                            <div>
                                <h1>{billingPlan.plan} ({billingType})</h1>
                                <p className="link" onClick={() => setActiveStepState(2)}>Change</p>
                            </div>
                            <p>${billingType == BillingType.MONTHLY ? billingPlan.monthlyCost : billingPlan.monthlyCost * 10}/{billingType == BillingType.MONTHLY ? "mo" : "yr"}</p>
                        </div>
                        <div className="lineBreak"></div>
                        <div className="addOns">
                            {addOnElements}
                        </div>
                    </div>

                    <div className="totalWrapper">
                        <p className="totalCostDesc">Total (per month)</p>
                        <p className="totalCost">+${totalCost}/{billingType == BillingType.MONTHLY ? "mo" : "yr"}</p>
                    </div>
                </FormContents>
            )
        case 5:
            return (
                <div className={`thanksWrapper ${isMobile ? "mobile" : ""}`}>
                    <img src="./src/assets/icon-thank-you.svg" alt="Thank You Icon" />
                    <h1>Thank you!</h1>
                    <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                </div>
            )
    }

    return (
        <></>
    )
}