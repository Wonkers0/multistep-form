import Banner from "./Banner"
import Form, { AddOnIntf } from "./Form"
import { useState } from "react"
import {assignMobileState} from "../main"
import { ARCADE, BillingType } from "./BillingCard"

function App() {
  const [isMobile, setMobile] = useState(false)
  assignMobileState(setMobile)
  
  return (
    <div className={`bgWrapper ${isMobile ? "mobile": ""}`}>
      <Banner isMobile={isMobile} />
      <main className={`mainWrapper ${isMobile ? "mobile" : ""}`}>
        <Form isMobile={isMobile}/>
      </main>
    </div>
  )
}

export default App
