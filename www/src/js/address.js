import { apiURL } from "../../Variables.js";
import { playAuduo } from "./error.js";
import { navigate } from "./functions.js";
import { calBack } from "./menu.js";
import { AddressFunction, miniSpinner, popUpError } from "./views.js";
const modalContainer = document.querySelector("#modalContainer");
const loadingPage = document.querySelector("#loadingPage");
async function Address(){

    try {
        let getLocations =  await fetch("../../src/json/luanda.json");
        if (getLocations.ok) {
            let locations = await getLocations.json();

            modalContainer.classList.add('active');
            modalContainer.innerHTML = AddressFunction(locations);
            const calBackButton = modalContainer.querySelector("#calBackButton");
            const formAddress = modalContainer.querySelector("#formAddress");
            const adicionarLocation = modalContainer.querySelector("#adicionarLocation");

            calBackButton.addEventListener("click", ()=>{
                calBack();
            });
            formAddress.addEventListener("submit", (e)=>{
                e.preventDefault();
            });
            adicionarLocation.addEventListener("click", ()=>{
                validateData();
            });

            const validateData = ()=>{
                let inputs = modalContainer.querySelectorAll(".inputData");
                inputs.forEach((input)=>{
                    input.addEventListener("input", ()=>{
                        input.style.border = "none";
                    })
                });
                let nameLocations = inputs[0];
                let details = inputs[1];
                if (nameLocations.value.trim() === "") {
                    nameLocations.style.border = "1px solid red";
                    nameLocations.placeholder = 'Preencha este campo!';
                } else if (details.value.trim() === "") {
                    details.style.border = "1px solid red";
                    details.placeholder = 'Preencha este campo!';
                } else{
                    senfFormData();
                }
            }

            const senfFormData = async ()=>{
                SetLoader(miniSpinner());
                const token_acces = localStorage.getItem("session_token");
                let formData = new FormData(formAddress);
                try {
                    let sendData =  await fetch(apiURL+"/addressapp",{
                        method:"POST",
                        headers:{
                            "Token-Acces":token_acces
                        },
                        body:formData  
                    });
                    if (sendData.ok) {
                        let data = await sendData.json();
                        closeLoader();
                        if(data.address.error){
                            SetError(data.address.error);
                            loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{
                                closeLoader();
                                let inputs = modalContainer.querySelectorAll(".inputData");
                                inputs.forEach(inpu=> inpu.value = "");
                            });
                        } else{
                            SetError(data.address.sucess);
                            loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{ 
                                closeLoader();
                                let inputs = modalContainer.querySelectorAll(".inputData");
                                inputs.forEach(inpu=> inpu.value = "")
                            });
                            playAuduo();
                        }
                    } else{
                        SetError(`Erro<i class="bi bi-exclamation-circle"></i> : 
                            conteúdo não encontrado, tente novamente mais tarde!`);
                        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{ calBack(); 
                            closeLoader();
                        });
                 
                    }
                } catch (error) {
                    SetError(
                        `Erro interno <i class="bi bi-exclamation-circle"></i> , por favor tente novamente mais tarde, caso o problema pressistir comunique a  nossa central de atendimento,<br> obrigado!`);

                    loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{ calBack();
                        closeLoader();
                    });
                }
            }

        } else{
            SetError(`Erro<i class="bi bi-exclamation-circle"></i> : conteúdo não encontrado, tente novamente mais tarde!`);
            loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{
                closeLoader();
                navigate("/home");
            })
        }
    } catch (error) {
        SetError(`Erro interno <i class="bi bi-exclamation-circle"></i> , por favor tente novamente mais tarde, 
                    caso o problema pressistir comunique a  nossa central 
                    de atendimento,<br> obrigado!`
                );

        loadingPage.querySelector("#confBtn").addEventListener("click", ()=>{
            closeLoader();
            navigate("/home");
        })
    }


    function SetError(error) {
        loadingPage.classList.add('active');
        loadingPage.innerHTML = popUpError(error);
    }

    function SetLoader(loader) {
        loadingPage.classList.add('active');
        loadingPage.innerHTML = loader;
    }
   
    function closeLoader(){
        loadingPage.classList.remove('active');
        loadingPage.innerHTML = "";
    }


}
export default Address;