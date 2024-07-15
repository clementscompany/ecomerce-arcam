import { apiURL } from "../../Variables.js";
import { playAuduo } from "./error.js";
import { modalContainer, navigate } from "./functions.js";
import TextLogin from "./tests/testlogin.js";
import { miniSpinner, popUpError, popUpView, spinnerButton, viewCarrinho } from "./views.js";
const loadingPage = document.querySelector("#loadingPage");
async function Carrinho(){

    if(TextLogin() == false){
        navigate("/login");
    }

    setLoading();
    const idUser = localStorage.getItem("session_token");

    try {
        let getDataCard = await fetch(apiURL+`/cartuser/?userid=${idUser}`, {method:"GET"});
        if (getDataCard.ok) {
            closeLoading();
            playAuduo();


            let data = await getDataCard.json();
            if(data.carrinho){
                if(data.carrinho.sucess){
                    var produtos = {
                        produtos:data.carrinho.sucess,
                        total:data.carrinho.total
                    }
                    modalContainer.classList.add('active');
                    modalContainer.innerHTML = viewCarrinho(produtos);

                    let choiseButtons = modalContainer.querySelectorAll("#choiseButtons > button");
                    let finalizeButton = modalContainer.querySelector("#finalizeButton");
                    finalizeButton.addEventListener("click", ()=>{
                        loadingPage.classList.add('active');
                        loadingPage.innerHTML = popUpView("Deseja realizar o pedido agora?");
                        let confirmButtons = loadingPage.querySelectorAll(".confBtn");
                        confirmButtons.forEach((button,index)=>{
                            button.addEventListener("click", ()=>{
                                switch(index){
                                    case 0:
                                        navigate("/finalizar");
                                    break;
                                    
                                    case 1:
                                        closeLoading();
                                    break;    
                                }
                            })
                        })
                    })
                    choiseButtons.forEach((button, index)=>{
                        button.addEventListener("click", ()=>{
                            switch (index) {
                                case 0:
                                    choiseButtons.forEach(item=>item.classList.remove('active'));
                                    button.classList.add('active');
                                    sessionStorage.setItem("option_pedido", "Receber em Casa");
                                    playAuduo();
                                    break;
                                    
                                    case 1:
                                        choiseButtons.forEach(item=>item.classList.remove('active'));
                                        button.classList.add('active');
                                        sessionStorage.setItem("option_pedido", "Retirar na Loja");
                                        playAuduo();
                                break;
                            }
                        })
                    })
                    let deleteCardButton = modalContainer.querySelectorAll("#deleteCardButton");
                    var listOrders = modalContainer.querySelectorAll(".listOrders");
                    deleteCardButton.forEach((deleteBtn, index)=>{
                        deleteBtn.addEventListener("click", async ()=>{
                            deleteBtn.innerHTML = spinnerButton();
                            try {
                                let deleteData = await fetch(apiURL+"/deleteitemcar", {
                                    method:"POST",
                                    headers:{
                                        "Token-Acces":idUser
                                    },
                                    body:JSON.stringify({id:deleteBtn.value})
                                });
                                if (deleteData.ok) {
                                    let data = await deleteData.json();
                                    if (data.delete.error) {
                                        deleteBtn.innerHTML = `<small>Erro ao eliminar!</small>`;
                                    } else{
                                        deleteBtn.innerHTML = `<small>Eliminado!</small>`;
                                        playAuduo();
                                        setTimeout(()=>{
                                            listOrders[index].style.display = "none";
                                        },400)
                                    }
                                } else{
                                    setError("Erro ao eliminar o item do carrinho! " + deleteData.statusText);
                                }
                            } catch (error) {
                                setError("Erro ao eliminar o item do carrinho! " + error);
                            }
                        });
                    })

                    let closeCarrinho = modalContainer.querySelector("#closeCarrinho");
                    closeCarrinho.addEventListener("click",()=>{ closeCarr() });

                } else{
                    loadingPage.classList.add('active');
                    loadingPage.innerHTML = popUpError(
                        `<br><i class="bi bi-cart-x" style="font-size:33pt;"></i>`
                    );
                    loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{
                        closeCarr()
                        closeLoading();
                    });
            
                }
            } 
     
        } else{
            setError("Erro interno, por favor tente novamente mais tarde! " + getDataCard.statusText);
        }
    } catch (error) {
        setError("Lamentamos! houve um erro interno, por favor tente novamente mais tarde! " + error);
    }

    ///-----------
    function closeCarr(){
        modalContainer.classList.remove('active');
        modalContainer.innerHTML = "";
    }
    function setError(message){
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(message);
        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{window.location.reload()});
    }
    function setLoading(){
        loadingPage.classList.add('active');
        loadingPage.innerHTML = miniSpinner();
    }
    function closeLoading(){
        loadingPage.classList.remove('active');
        loadingPage.innerHTML = "";
    }
    
}

export default Carrinho;