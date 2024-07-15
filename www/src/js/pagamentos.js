import { apiURL } from "../../Variables.js";
import { playAuduo } from "./error.js";
import { navigate } from "./functions.js";
import { calBack } from "./menu.js";
import { miniSpinner, paymentViews, popUpError, resumePedido } from "./views.js";
const modalContainer = document.querySelector("#modalContainer");
const loadingPage = document.querySelector("#loadingPage");
async function MetodoDePagamento(){
    // openLoad();
  
    modalContainer.classList.add('active');
    modalContainer.innerHTML = paymentViews();
    playAuduo();
    let calBackButton = modalContainer.querySelector("#calBackButton");
    calBackButton.addEventListener("click", ()=>{calBack()});

    let homeData = modalContainer.querySelectorAll(".homeData");
    homeData.forEach((element,index)=>{
        element.addEventListener("click", ()=>{
            homeData.forEach(card=>card.classList.remove('active'));
            element.classList.add('active');
            playAuduo();

            switch (index) {
                case 0:
                    openLoad();
                    resumeData("TPA");
                break;
            
                default:
                break;
            }

        })
    })

    async function resumeData(payment) {
        const id = localStorage.getItem("session_token");
        const location = sessionStorage.getItem("local_entrega")
        if (!id) {
            navigate("/login");
        }
        try {
            let getCard = await fetch(apiURL+"/confirmordre/?location="+location, {
                method:"GET",
                headers:{
                    'Token-Acces':id
                }
            });
            if (getCard.ok) {
                closeAll();
                var cards = await getCard.json();
                if (cards.confirm.address) {
                    playAuduo();
                    modalContainer.innerHTML = resumePedido(cards);
                    modalContainer.querySelector("#nextButton").addEventListener("click", ()=>{
                        var total = cards.confirm.pedido.total;
                        realizePedido(total,payment);
                    });
                    let calBackButton = modalContainer.querySelector("#calBackButton");
                    calBackButton.addEventListener("click", ()=>{ MetodoDePagamento(); });
                    

                } else{
                    loadingPage.classList.add('active');
                    loadingPage.innerHTML = popUpError(cards.confirm.error);
                    loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{window.location.reload()});
                }
            } else{
                setError(`Houve um erro, tente mais tarde!<br>` + getCard.statusText);
            }
        } catch (error) {
            setResponde(`Houve um erro, tente mais tarde!<br>`);
        }
        
    }

    async function realizePedido(total,methodPayment){
        openLoad();
        const idUser = localStorage.getItem("session_token");
        let locationId = sessionStorage.getItem("local_entrega");
        let optionEntrega = sessionStorage.getItem("option_pedido") || "Receber em Casa";

        try {   
            let sendData = await fetch(apiURL+"/finishstore", {
                method:"POST",
                headers:{
                    "Token-Acces":idUser
                },
                body:JSON.stringify({total:total, metodo:methodPayment, location:locationId, option:optionEntrega})
            });
            if (sendData.ok) {
                let data = await sendData.json();
                if (data.finish.sucess) {
                    setResponde(data.finish.sucess)
                } else{
                    setResponde(data.finish.error)
                }
            }
        } catch (error) {
            setError("Erro inesperado!<br>" + error);
        }
    }

    function openLoad() {
        loadingPage.classList.add('active');
        loadingPage.innerHTML = miniSpinner();
    }
    function closeAll(params) {
        loadingPage.classList.remove('active');
        loadingPage.innerHTML = "";
    } 
    function setError(message){
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(message);
        let confBtn = loadingPage.querySelector("#confBtn");
        confBtn.addEventListener("click", ()=>{window.location.reload()});
    }
    function setResponde(response) {
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(response);
        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{ closeAll(); navigate("/home") });
    }
}
export default MetodoDePagamento;
