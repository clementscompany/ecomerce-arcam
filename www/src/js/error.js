import { modalContainer } from "./functions.js";
const confirmAudio = document.querySelector("#confirmAudio");
export default function errorValidation(parm){
    let data = modalContainer.querySelector("#TextError");
    data.classList.add('error') || data.classList.replace('sucess', 'error');
    data.innerHTML = parm;
}
export function messageLogin(parm){
    let data = modalContainer.querySelector("#TextError");
    data.classList.add('sucess') || data.classList.replace('error', 'sucess');
    data.style.fontSize = "14pt";
    data.innerHTML = parm;
}

export function playAuduo(params) {
    confirmAudio.play();
}

