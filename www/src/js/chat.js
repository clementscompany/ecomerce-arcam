const modalContainer = document.querySelector("#modalContainer");
const loadingPage = document.querySelector("#loadingPage");

import { apiURL } from '../../Variables.js';
import { navigate } from './functions.js';
import TextLogin from './tests/testlogin.js';
import { miniSpinner, popUpError, popUpView, spinnerButton, viewChat } from './views.js';
export default async function chatArea(){
    
    setLoading();

    if(TextLogin()){
        const id = localStorage.getItem("session_token");
        try {
            let getData = await fetch(apiURL+"/listordress?iduser="+id, {method:"GET"});
            if (getData.ok) {
                let data = await getData.json();
                closeLoading();
                if (data.confirm) {

                    modalContainer.classList.add('active');
                    modalContainer.innerHTML = viewChat(data.confirm);
                    let deletePedido  = modalContainer.querySelectorAll("#deletePedido");
                    let incamming = modalContainer.querySelectorAll(".incamming");
                    deletePedido.forEach((button, index)=>{
                        button.addEventListener("click", async ()=>{
                            // button.innerHTML = spinnerButton();
                            loadingPage.classList.add('active');
                            loadingPage.innerHTML = popUpView("Deseja eliminar este pedido?");
                            let btns = loadingPage.querySelectorAll(".confBtn");
                            btns.forEach((option, indexButton)=>{
                                option.addEventListener("click", async ()=>{
                                    switch (indexButton) {
                                        case 0:
                                            closeLoading();
                                            button.innerHTML = spinnerButton();
                                            try {
                                                let deleteData = await fetch(apiURL+"/deletepedido", {
                                                    method:"POST",
                                                    headers:{
                                                        "Token-Acces":id
                                                    },
                                                    body:JSON.stringify({produtoid:button.value})
                                                })
                                                if (deleteData.ok) {
                                                    let data = await deleteData.json();
                                                    if (data.delete.sucess) {
                                                        setTimeout(()=>{
                                                            incamming[index].style.display = "none";
                                                        }, 1000);
                                                    } else {
                                                        setError("Houve um erro,por favor tente mais tarde!,<br>");
                                                    }
                                                }
                                            } catch (error) {
                                                setError("Houve um erro,por favor tente mais tarde!,<br>" + error);
                                            }
                                        break;
                                        
                                        case 1:
                                           closeLoading();
                                        break;
                                    }
                                })
                            })
                        })
                    })
                    // ----

                } 
            } else{
                setError("Houve um erro,por favor tente mais tarde!,<br>" +getData.statusText);
            }
        } catch (error) {
            setError("Houve um erro,por favor tente mais tarde!,<br>" +error);
        }
  
    
        const chatAreaButtons = modalContainer.querySelectorAll(".chatArea > button");
        chatAreaButtons.forEach((button,index)=>{
            button.addEventListener("click", ()=>{
                switch(index){
                    case 0 :
                        back();
                    break;
                    
                    case 1 :
                        alert("Nosso whatsapp!");
                    break;    
                }
            })
        })
    
        function back(){
            modalContainer.innerHTML = "";
            modalContainer.classList.remove('active');
            navigate('/home');
        }
    }

    else{
        navigate("/login");
    }
    
    function setLoading() {
        loadingPage.classList.add('active');
        loadingPage.innerHTML = miniSpinner();
    }
    function closeLoading() {
        loadingPage.classList.remove('active');
        loadingPage.innerHTML = "";
    }
    function setError(message) {
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(message);
        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{window.location.reload()});
    }
}