import errorValidation, { messageLogin } from "./error.js";
import chatArea from "./chat.js";
import homePage from "./home.js";
import produtos from "./produtos.js";
import Login, { CadastroPage, dadosPaddword } from "./loginformdata.js";
import { dadosContact } from "./loginformdata.js";
import { 
 aboutUs,
 cominicateProblem, 
 locationsHome, 
 menuNotifications,
 seetingsPage
} from "./menu.js";
import { apiURL } from "../../Variables.js";
import { miniSpinner, reloadButton } from "./views.js";
import Address from "./address.js";
import endPage from "./finalize.js";
import MetodoDePagamento from "./pagamentos.js";


export const modalContainer = document.querySelector("#modalContainer");
// (((((((((((((((((((((((pagina Login)))))))))))))))))))))))//
export function startLoginPage(){
   
    modalContainer.innerHTML = Login();
    modalContainer.classList.add('active');


    ////FormData
    let formDadaLogin = document.querySelector("#formDadaLogin");
    formDadaLogin.addEventListener("submit", (e)=>{
        e.preventDefault();
    });

    ///LoginBTN
    let loginBtn = modalContainer.querySelector("#loginBtn");
    loginBtn.addEventListener("click", ()=>{validation()});

    let cadastroBtn = modalContainer.querySelector("#cadastroBtn");
    cadastroBtn.addEventListener("click", ()=>{cadastrate()})

    let lookIcone = modalContainer.querySelector("#lookIcone");
    lookIcone.addEventListener("click", ()=>{
        let inputPass = modalContainer.querySelector("#inputPass");
        if(inputPass.type == "password"){
            inputPass.type = "text";
        }
        else{
            inputPass.type = "password";
        }
    })

    ///ValidationFunctions 
    function validation(){
        let inputEmail = modalContainer.querySelector("#inputEmail")
        let inputPass = modalContainer.querySelector("#inputPass")
        let emailValue = inputEmail.value;
        let passlValue = inputPass.value;

        if(emailValue == "" && passlValue == ""){
            inputEmail.classList.add('error');
            inputPass.classList.add('error');
            errorValidation("Por favor, preencha todos os campos!")
        }
        else if(emailValue == ""){
            inputEmail.classList.add('error');
            inputPass.classList.remove('error');
            errorValidation("Seu email é obrigatório!")
        }
        else if(passlValue == ""){
            inputEmail.classList.remove('error');
            inputPass.classList.add('error');
            errorValidation("Por favor digite a sua senha...")
        }
        else{
           requestLogin(emailValue,passlValue);
        }

    }

    //solicitacao http Login
    async function requestLogin(username, password) {
        messageLogin(miniSpinner());
        try {
            let sendData = await fetch(apiURL+"/applogin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }, 
                body:JSON.stringify({username,password})
            });
            if (sendData.ok) {
                messageLogin(" ");
                let data = await sendData.json();
                if (data.login.error) {
                    errorValidation(data.login.error);
                } else{
                    messageLogin(data.login.sucess);
                    localStorage.setItem("session_token", data.login.token);
                    navigate("/home");
                }
            } else {
                errorValidation("Erro: "+error);
            }
        } catch (error) {
            errorValidation("Erro: "+error);
        }
    }

    function cadastrate(){
        modalContainer.innerHTML = CadastroPage();

        let formDadaLogin = document.querySelector("#formDadaLogin");
        formDadaLogin.addEventListener("submit", (e)=>{
            e.preventDefault();
        });

        let enterButton = document.querySelector("#enterButton");
        enterButton.addEventListener("click", ()=>{startLoginPage()});

        
        let inputName = modalContainer.querySelector("#inputName")
        let inputSurname = modalContainer.querySelector("#inputSurname")
        let nextCadastrateBtn = document.querySelector("#nextCadastrateBtn");
        

        inputSurname.addEventListener("input", ()=>{
        let NameValue = inputName.value;    
        let surnameValue = inputSurname.value;
        
          if(surnameValue.length >= 3){

            if(NameValue == ""){
                inputName.classList.add('error');
                errorValidation("O campo nome é obrigatório");
            }
            else{
                inputName.classList.remove('error');
                errorValidation("");
                nextCadastrateBtn.classList.add('active');

            }

            nextCadastrateBtn.addEventListener("click", ()=>{
                InsertValues(NameValue, surnameValue);
            })

          }
          else{
            nextCadastrateBtn.classList.remove('active');
          }
        })

        function InsertValues(nome,sobreNome) {

            let formDadaLogin = document.querySelector("#formDadaLogin");
            formDadaLogin.innerHTML = dadosContact();

            let inputEmailContact = formDadaLogin.querySelector("#inputEmailContact");
            let inputTel = formDadaLogin.querySelector("#inputTel");
            let successContact = formDadaLogin.querySelector("#successContact");
            let enterButton = formDadaLogin.querySelector("#enterButton");

            inputTel.addEventListener("input", ()=>{
                let mail = inputEmailContact.value
                let telephone = inputTel.value

                if(telephone.length >= 3){
                    if(mail == ""){
                        inputEmailContact.classList.add('error');
                        errorValidation("Digite o seu email");
                    }
                    else{
                        inputEmailContact.classList.remove('error');
                        errorValidation("");
                    }
                }
                if(telephone.length >= 9 && telephone.length <=9){
                    successContact.classList.add('active');
                }
                else{
                    successContact.classList.remove('active');
                }

            })

           // armazenando os dados temporarios
            let localStorageDataName = nome;
            let localStorageDataSurname = sobreNome;

            localStorage.setItem("dadosNome",localStorageDataName)
            localStorage.setItem("dadosSobrenome",localStorageDataSurname)

            //Continuar
            successContact.addEventListener("click", ()=>{
                 let storageEmail  = inputEmailContact.value;
                 let storageTelephone = inputTel.value;

                 localStorage.setItem("dataEmail", storageEmail)
                 localStorage.setItem("dataTelephone", storageTelephone)

                formDadaLogin.innerHTML = dadosPaddword();

                let enterButton = document.querySelector("#enterButton");
                enterButton.addEventListener("click", ()=>{startLoginPage()});

                let iconToggle1 =  formDadaLogin.querySelector("#paddwordToggle");
                let iconToggle2 = formDadaLogin.querySelector("#passwordConfirme");
                let inputPassword = formDadaLogin.querySelector("#inputPassword");
                let inputConfirmPassword = formDadaLogin.querySelector("#inputConfirmPassword");
                let successPassword =  formDadaLogin.querySelector("#successPassword");

                iconToggle1.addEventListener("click", ()=>{
                    if(inputPassword.type == "password"){
                        inputPassword.type = "text";
                    }
                    else{
                        inputPassword.type = "password"
                    }
                })

                iconToggle2.addEventListener("click", ()=>{
                    if(inputConfirmPassword.type == "password"){
                        inputConfirmPassword.type = "text";
                    }
                    else{
                        inputConfirmPassword.type = "password"
                    }
                })
                inputConfirmPassword.addEventListener("input", ()=>{

                    if(inputPassword.value == ""){
                        errorValidation("Digite primeiro a sua senha!");
                        inputPassword.classList.add('error');
                    }
                    else{
                        errorValidation(" ");
                        inputPassword.classList.remove('error')
                    }

                    if(inputConfirmPassword.value.length >= 4){
                        successPassword.classList.add('active');
                    }
                    
                })
                successPassword.addEventListener("click", async ()=>{

                    messageLogin(miniSpinner());

                    if(inputPassword.value === inputConfirmPassword.value){

                        inputPassword.classList.remove('error');
                        inputConfirmPassword.classList.remove('error');
                         ////pagar os dados do lcalstorage////
                         ////fazer requisicao ao back end!////
                        let nome = localStorage.getItem("dadosNome");
                        let sobrenome = localStorage.getItem("dadosSobrenome");
                        let email = localStorage.getItem("dataEmail");
                        let telefone = localStorage.getItem("dataTelephone");
                        let senha = inputPassword.value;
                        
                        try {
                            let sendData = await fetch(apiURL+"/clientcadastro", {
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({cadastro:{nome,sobrenome,email,telefone,senha}})
                            });
                            if (sendData.ok) {
                                let data = await sendData.json();
                                if (data.cadastro.error) {
                                    errorValidation(data.cadastro.error);
                                    reloadCadastro();
                                } else if (data.cadastro.mailerror) {
                                    errorValidation(data.cadastro.mailerror);
                                    reloadCadastro();
                                } else {
                                    messageLogin(data.cadastro.sucess);
                                    
                                    setTimeout(()=>{
                                        startLoginPage();
                                    },2000);

                                    localStorage.removeItem("dadosNome");
                                    localStorage.removeItem("dadosSobrenome");
                                    localStorage.removeItem("dataEmail");
                                    localStorage.removeItem("dataTelephone");
                                }

                            } else{
                                errorValidation("Erro: " +sendData.statusText);
                                reloadCadastro();
                            }
                            
                        } catch (error) {
                            errorValidation("Erro: " +error);
                        }

                    }
                    else{
                        errorValidation("As senhas não corrspondem!");
                        inputPassword.classList.add('error');
                        inputConfirmPassword.classList.add('error');
                    }
                })

                function reloadCadastro(params) {
                    formDadaLogin.innerHTML = reloadButton();
                    formDadaLogin.querySelector("#reloadButton").addEventListener("click", ()=>{
                        cadastrate();
                    })
                }

            });

            //Voltar ao Loin 
            enterButton.addEventListener("click", ()=>{startLoginPage()});


        }      

    }

    
}
// (((((((((((((((((((((((Rotas de navegacao)))))))))))))))))))))))//

export function navigate(route){
    window.location.hash = route;
}

export function renderContent(){
    var path = window.location.hash.substring(1);

    switch(path){   
        case '/login':
            startLoginPage();
        break;
        
        case '/home':
            homePage();
        break;
        
        case '/chat':
            chatArea();
        break;

        case '/produtos':
            produtos();
        break;

        case '/notifications':
            menuNotifications();
        break;

        case '/aboutus':
            aboutUs();
        break;    

        case '/locations':
            locationsHome();
        break;  

        case '/comunicaion':
            cominicateProblem();
        break; 

        case '/seetings':
            seetingsPage();
        break;

        case "/address":
            Address();
        break;
        
        case "/finalizar":
            endPage();
        break;    
        // paymentmethod

        case "/paymentmethod":
            MetodoDePagamento();
        break; 

        default :
            homePage();
        break;
    }
}
