import { useEffect } from "react"
import { BillingType } from "./BillingCard"

interface SliderProps{
  billingState: Function,
  billingType: BillingType
}

export default function BillingSlider({billingState, billingType}: SliderProps) {
  const setMonthly = () => {
    console.log("hello")
    $(".billingSel").css({left:"0"})
    $("#yearly").removeClass("selected")
    $("#monthly").addClass("selected")
    billingState(BillingType.MONTHLY)
  }

  const setYearly = () => {
    $(".billingSel").css({left: "50%"})
    $("#monthly").removeClass("selected")
    $("#yearly").addClass("selected")
    billingState(BillingType.YEARLY)
  }


  useEffect(() => {
    if(billingType == BillingType.YEARLY) setYearly();
  }, [])

  return (
      <div className="billingWrapper">
          <p id="monthly" className="billingType selected">Monthly</p>
          <div className="billingSlider">
              <div onClick={setMonthly}></div>
              <div onClick={setYearly}></div>
              <div className="billingSelWrapper">
                  <div className="billingSel"></div>
              </div>
          </div>
          <p id="yearly" className="billingType">Yearly</p>
      </div>
  )
}