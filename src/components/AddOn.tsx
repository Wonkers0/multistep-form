import { useRef } from "react";
import { BillingType } from "./BillingCard"
import Checkbox from "./Checkbox"
import { AddOnIntf } from "./Form";

interface AddOnProps{
  title: string,
  description: string,
  cost: number,
  billingType: BillingType,
  addOns: AddOnIntf[],
  setAddOns: Function
}

export default function AddOn({title, description, cost, billingType, addOns, setAddOns}: AddOnProps){
  const addOn = useRef<HTMLElement>(null);
  const thisAddOn: AddOnIntf = {
    title: title,
    cost: cost
  }

  const select = (elem: HTMLElement) => {
    if(addOn.current == null) return
    
    if(addOns.some(e => e.title == thisAddOn.title)) addOns = arrayRemove(addOns, thisAddOn)
    else addOns.push(thisAddOn)
    
    setAddOns(addOns.slice())
  }

  return (
    <div ref={addOn as React.RefObject<HTMLDivElement>} className={`addOn ${addOns.some(e => e.title == thisAddOn.title) ? "selected" : ""}`}>
      <div>
        <Checkbox onClick={select}/>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <p>+${billingType == BillingType.YEARLY ? cost * 10 : cost}/{billingType == BillingType.YEARLY ? "yr" : "mo"}</p>
    </div>
  )
}

function arrayRemove(arr: AddOnIntf[], val: AddOnIntf){
  return arr.filter(el => el.title != val.title)
}