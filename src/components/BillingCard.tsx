interface Props {
  cardInfo: CardInfo,
  billingType: BillingType,
  billingPlan: PlanType,
  setBillingPlan: Function,
  isMobile: boolean
}

export enum PlanType{
  ARCADE = "Arcade",
  ADVANCED = "Advanced",
  PRO = "Pro"
}

export enum BillingType{
  MONTHLY = "Monthly",
  YEARLY = "Yearly"
}

class CardInfo{
  plan: PlanType
  imgURL: string
  monthlyCost: number
  cost: number | undefined

  constructor(imgURL : string, plan: PlanType, monthlyCost: number){
      this.imgURL = imgURL
      this.monthlyCost = monthlyCost
      this.plan = plan
  }

  getCost(billingType: BillingType) : string {
      return billingType == BillingType.MONTHLY ? 
      `$${this.monthlyCost}/mo` : `$${this.monthlyCost * 10}/yr`;   
  }
}

export const ARCADE = new CardInfo("./src/assets/icon-arcade.svg", PlanType.ARCADE, 9)
export const ADVANCED = new CardInfo("./src/assets/icon-advanced.svg", PlanType.ADVANCED, 12)
export const PRO = new CardInfo("./src/assets/icon-pro.svg", PlanType.PRO, 15)

export default function BillingCard({cardInfo, billingType, billingPlan, setBillingPlan, isMobile}: Props){
  const selectCard = (elem: HTMLElement) => {
    $(".billingCard.selected").removeClass("selected")
    elem.classList.add("selected")

    setBillingPlan(cardInfo)
  }

  return (
      <div className={`billingCard ${billingPlan == cardInfo.plan ? "selected" : ""} ${isMobile ? "mobile" : ""}`} onClick={event => selectCard(event.currentTarget)}>
          <img src={cardInfo.imgURL}/>
          <div>
              <h1>{cardInfo.plan}</h1>
              <h2>{cardInfo.getCost(billingType)}</h2>
          </div>
      </div>
  )
}