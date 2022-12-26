import FormStep from "./FormStep"

interface BannerProps{
    isMobile: boolean
}

export default function Banner({isMobile}: BannerProps){
    return isMobile ? 
    (
        <div className={"topBanner"}>
          <FormStep step={1} subtitle="YOUR INFO" isMobile={isMobile}/>
          <FormStep step={2} subtitle="SELECT PLAN" isMobile={isMobile}/>
          <FormStep step={3} subtitle="ADD-ONS" isMobile={isMobile}/>
          <FormStep step={4} subtitle="SUMMARY" isMobile={isMobile}/>
        </div>
    ) :
    (
        <div className={"sideBanner"}>
          <FormStep step={1} subtitle="YOUR INFO" isMobile={isMobile}/>
          <FormStep step={2} subtitle="SELECT PLAN" isMobile={isMobile}/>
          <FormStep step={3} subtitle="ADD-ONS" isMobile={isMobile}/>
          <FormStep step={4} subtitle="SUMMARY" isMobile={isMobile}/>
        </div>
    )
}