import { apiURL } from "../../Variables.js";
import { playAuduo } from "./error.js";
import { navigate } from "./functions.js";
import { calBack } from "./menu.js";
import { checkLocation, popUpError } from "./views.js";
import { miniSpinner } from "./views.js";
const loadingPage = document.querySelector("#loadingPage");
const modalContainer = document.querySelector("#modalContainer");

function endPage() {
    modalContainer.classList.add('active');
    setLoading();
    const idUser = localStorage.getItem("session_token");

    async function getLocation() {
        try {
            let getLocation = await fetch(apiURL+`/locationauser?userid=${idUser}`,{
                method:"GET"
            });
            if (getLocation.ok) {
                closeAll();
                let response = await getLocation.json();
                var resultData = {local:response.location.datauser}
                var errorData = {local:response.location.error}
                if (response.location.datauser) {
                    playAuduo();
                    modalContainer.innerHTML = checkLocation(resultData);
                    
                    modalContainer.querySelector("#calBackButton").addEventListener("click",()=>{calBack()});
                    let homeData = modalContainer.querySelectorAll(".homeData");
                    homeData.forEach((button)=>{
                        button.addEventListener("click", ()=>{
                            homeData.forEach(element=> element.classList.remove('active'));
                            button.classList.add('active');
                            sessionStorage.setItem("local_entrega", button.id);
                            playAuduo();
                        })
                    })
                    
                } else{
                    modalContainer.innerHTML = checkLocation(errorData);
                    modalContainer.querySelector("#calBackButton").addEventListener("click",()=>{calBack()})
                }

                let nextButton = modalContainer.querySelector("#nextButton");
                nextButton.addEventListener("click", (e)=>{
                    let idEntrega = sessionStorage.getItem("local_entrega");
                    if (!idEntrega) {
                        setError("Selecione o Local de entrega!");
                    } else{
                        navigate("/paymentmethod");
                    }
                })
            } else{
                setSystemError(`Erro, por favor tente mai tarde!<br>` + getLocation.statusText);
            }
        } catch (error) {
            setSystemError(`Erro, por favor tente mai tarde!<br>` + error);
        }
    }

    getLocation();
   
    function setSystemError(message){
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(message);
        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{window.location.reload()});
    }

    function setError(message){
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(message);
        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{closeAll()});
    }

    function setLoading(){
        loadingPage.classList.add('active');
        loadingPage.innerHTML = miniSpinner();
    }

    function closeAll(){
        loadingPage.classList.remove('active');
        loadingPage.innerHTML = "";
    }
}
export default endPage;