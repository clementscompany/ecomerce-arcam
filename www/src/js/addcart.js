import { apiURL } from "../../Variables.js";
import { playAuduo } from "./error.js";
import { miniSpinner, popUpError, wiewAddCart } from "./views.js";
const loadingPage = document.querySelector("#loadingPage");
const modalContainer = document.querySelector("#modalContainer");

export default async function adicionarProduto(id) {

  openLoader();
  try {
    let getProduct = await fetch(apiURL + `/search?id=${id}`, { method: "GET" });
    if (getProduct.ok) {

      let data = await getProduct.json();
      openCodalConteiner(); closeLoader();
      if (data.getdata.sucess) {

        modalContainer.innerHTML = wiewAddCart(data.getdata.sucess);
        

        let buttonClose = modalContainer.querySelector(".topNavigation > button");
        buttonClose.addEventListener("click", () => { closeModalContaoner() })
 

        const price = parseInt(data.getdata.sucess.preco);
        const id = parseInt(data.getdata.sucess.id);
        //Functions Data Card
        setPrice(price,id);

        function  setPrice(pr, idProd){
   
          let quant = modalContainer.querySelector("#quantidadeInput");
          let total = modalContainer.querySelector("#totalCard");
          let buttonsRec = modalContainer.querySelectorAll("#buttonsRec > button");
          let qt = parseInt(quant.value);


          total.innerHTML = `<b>Total do produto : </b>${pr * qt}`+ " Kz";

          buttonsRec.forEach((button, index)=>{
            button.addEventListener("click", ()=>{
              switch(index){
                case 0:
                  qt = qt + 1;
                  quant.value = qt;
                  total.innerHTML = `<b>Total do produto : </b>${pr * qt}`+ " Kz";
                break;
                
                case 1:
                  if (qt > 1) {
                    qt = qt - 1;
                    quant.value = qt;
                    total.innerHTML = `<b>Total do produto : </b>${pr * qt}`+ " Kz";
                }
                break;
              }
            })
          })

          let adicionarButton = modalContainer.querySelector("#adicionarButton");
          adicionarButton.addEventListener("click", async ()=>{
            const token = localStorage.getItem("session_token");
            const idProduto = idProd;
            const quantity = qt;
            openLoader();
            try {
              let sendData = await fetch(apiURL+"/addcardshop", {
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  "Token-Acces":token
                },
                body:JSON.stringify({productid:idProduto, quantidade:quantity})
              });
              if (sendData.ok) {
                closeLoader();
                let sendedDada = await sendData.json();
                if (sendedDada) {
                  if (sendedDada.addcard.sucess) {
                    setResponse(sendedDada.addcard.sucess)
                    playAuduo();
                  } else{
                    setResponse(sendedDada.addcard.error)
                  }
                }
              } else{
                setError(sendData.statusText);
              }
            } catch (error) {
              setError("Houve um erro, por favor tente mais tarde! : " + error);
            }
          })
        }

      } else {
        setError(data.getdata.statusText);
      }
    } else {
      setError("Erro ou problema de conexão, por favor tente novamente mais tarde!" + error);
    }

  } catch (error) {
    setError("Erro interno! por favor tente novamente mais tarde!" + error);
  }




  //////////////////////---Open and Close Container Functions!
  function openCodalConteiner() {
    modalContainer.classList.add('active');
  }
  function closeModalContaoner() {
    modalContainer.classList.remove('active');
    modalContainer.innerHTML = "";
  }

  function setError(message) {
    loadingPage.classList.add('active');
    loadingPage.innerHTML = popUpError(message);
    loadingPage.querySelector("#confBtn").addEventListener("click", () => { window.location.reload() });
  }

  function closeLoader() {
    loadingPage.classList.remove('active');
    loadingPage.innerHTML = "";
  }

  function openLoader() {
    loadingPage.classList.add('active');
    loadingPage.innerHTML = miniSpinner();
  }

  function setResponse(message) {
    loadingPage.classList.add('active');
    loadingPage.innerHTML = popUpError(message);
    loadingPage.querySelector("#confBtn").addEventListener("click", () => { closeLoader() });
  }
}