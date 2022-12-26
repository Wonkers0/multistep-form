import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './style.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)

let mobileState: Function
let mobile: Boolean = false

export function assignMobileState(func: Function){
  if(mobileState != null) return
  mobileState = func
  checkScreenWidth()
}

const checkScreenWidth = () => {
  const oldMobile = mobile
  mobile = window.document.documentElement.clientWidth < 840
  if(oldMobile != mobile) mobileState(mobile) // Used to force a re-render
  if(mobile == true) document.querySelector("body")?.classList.add("mobile")
  else document.querySelector("body")?.classList.remove("mobile")
}

window.onresize = checkScreenWidth



window.onload = () => setActiveStep(1)
export function setActiveStep(step: Number){
  if(document.getElementById(`step${step}`) != null){
    $(`.step.selected`).removeClass("selected")
    $(`#step${step}`).addClass("selected")
  } 
}
