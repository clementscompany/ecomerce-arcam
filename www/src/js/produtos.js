import TextLogin from "./tests/testlogin.js";
import { viewProdutos } from "./views.js";
const modalContainer = document.querySelector("#modalContainer");
const bodyContainer = document.querySelector("#bodyContainer");
export default async function produtos(){
    if (TextLogin()) {

        modalContainer.classList.remove('active');
        bodyContainer.innerHTML = viewProdutos();
        
    }
 
}