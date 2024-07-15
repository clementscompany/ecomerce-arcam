import { playAuduo } from "./error.js";
import { navigate } from "./functions.js";
import TextLogin from "./tests/testlogin.js";
import { themesystem } from "./themesystem.js";
import { 
aboutUsview, 
locationsHomeView,
notificationView, 
popUpView, 
viewListMenu,
viewSeetings,
wiewHelpContainer
} from "./views.js";

const leftContainer = document.querySelector("#leftContainer");
const bodyContainer =  document.querySelector("#bodyContainer");
const modalContainer = document.querySelector("#modalContainer");

export default function leftMenu(){

    leftContainer.classList.add('active');
    leftContainer.innerHTML = viewListMenu();
    bodyContainer.style = "filter:blur(12px)";
//////////////////---------------------------

    var buttonClosingMenuBar = leftContainer.querySelector("#buttonClosingMenuBar");
    var listsButton = leftContainer.querySelectorAll(".list");

    bodyContainer.addEventListener("click", ()=>{ closeMenuBar() })
    buttonClosingMenuBar.addEventListener("click", ()=>{ closeMenuBar() })
//////////////////---------------------------

    listsButton.forEach((button,index)=>{
        button.addEventListener("click", ()=>{
          switch(index){
            case 0:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active');
                navigate('/notifications');
            break;   
            
            case 1:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active');
                navigate('/aboutus');
            break;   

            case 2:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active'); 
               navigate('/locations');
            break;   

            case 3:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active');
                 navigate('/comunicaion');
            break;   

            case 4:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active');
                 navigate('/seetings');
            break;   

            case 5:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active');
                changeTheme();
            break;   

            case 6:
                listsButton.forEach(element=> element.classList.remove('active'));
                button.classList.add('active');
                logLoutPage();
            break;   
          }
        })
    })

//////////////////---------------------------

    function closeMenuBar(){
       leftContainer.classList.remove('active');
       leftContainer.innerHTML = "";
       bodyContainer.style = "filter:initial";
    }

}

export function calBack(){
    window.history.back();
}

////////////////////////---------------notifications 
export function menuNotifications(){

    if(TextLogin() == false) {
      navigate("/login");
    }

    modalContainer.classList.add("active");
    modalContainer.innerHTML = notificationView();
    playAuduo();

    var backButtonNot = modalContainer.querySelector("#backButtonNot");

    backButtonNot.addEventListener("click", ()=>{ calBack() })

}
///////////////////////--------------------------about us
export async function aboutUs(){

    if(TextLogin() == false) {
        navigate("/login");
    }
  
    modalContainer.classList.add('active');

    modalContainer.innerHTML = aboutUsview();

    var AboutButton = modalContainer.querySelector("#AboutButton");
    
    AboutButton.addEventListener("click", ()=>{calBack()});
    
   var listAboutUs = modalContainer.querySelector("#listAboutUs");
   var listMoreAboutUs = modalContainer.querySelector("#listMoreAboutUs");


    try {
        let getData = await fetch("../../src/json/sobre.json");

        if(getData.ok){
            playAuduo();
            let responseData = await getData.json();
            let about = responseData.sobre

            let innerCard  = "";
            let innerMoreCard  = "";

            about.forEach(info=>{
               innerCard +=  `
                 <li class="CardNot aboutUs">
                 <h4>Quem Somos?</h4>
                 <h4> ${info.nome}</h4>
                 <h4>${info.slogan}</h4>
                 <span class="textInfo">${info.Descricao}</span>
                 </li>
               
                `;


              info.ServicosOferecidos.forEach(more=>{
                  innerCard += `
                  <li class="CardNot aboutUs">
                  <h4> ${more.topic}</h4>
                  <span class="textInfo">${more.Atendimento}</span>
                  </li>
                  `
               })

            })

            
            listAboutUs.innerHTML = innerCard
            listMoreAboutUs.innerHTML = innerMoreCard;
        }
        else{
            console.log("Erro na solicitacao!");
        }

    } catch (error) {
        console.log("Erro" + error);
    }



}
////////////////////////////---------------------------our location 
export async function locationsHome(){
    
    if(TextLogin() == false) {
        navigate("/login");
    }  

    modalContainer.classList.add('active');
    modalContainer.innerHTML  = locationsHomeView();


    var locationButton = modalContainer.querySelector("#locationButton");

    locationButton.addEventListener("click", ()=>{ calBack() });

     try {
        let getData = await fetch("../../src/json/location.json");
    
        if(getData.ok){

            let response = await getData.json();
            
            let locais = response.locais;
            let luanda = locais.Luanda;

            playAuduo();

            var card = "";
            luanda.forEach(lua =>{
                card += `
                <li class="CardNot provinces">
                    <h2>Luanda <i class="bi bi-geo-alt-fill"></i></h2>
                    <span><b>Bairro:</b> ${lua.bairro}</span>
                    <span><b>Telefone:</b> ${lua.telefone}</span>
                    <span><b>Local:</b> ${lua.local}</span>
                </li>
                `
            })
           let luandaCard =  modalContainer.querySelector("#luanda")
           luandaCard.innerHTML = card;
           
           var cardBG = "";
           let benguela = locais.Benguela;
           benguela.forEach(bg=>{
              cardBG += `
              <li class="CardNot provinces">
                <h2>Benguela <i class="bi bi-geo-alt-fill"></i></h2>
                <span><b>Bairro:</b> ${bg.bairro}</span>
                <span><b>Telefone:</b> ${bg.telefone}</span>
                <span><b>Local:</b> ${bg.local}</span>
              </li>
              `;
           })

           let benguelaCard = modalContainer.querySelector("#benguela");
           benguelaCard.innerHTML = cardBG;

           let cardLubango = "";
           let huila = locais.Huila;
           huila.forEach(lubango =>{
             cardLubango += `
            <li class="CardNot provinces">
                <h2>Lubango <i class="bi bi-geo-alt-fill"></i></h2>
                <span><b>Bairro:</b> ${lubango.bairro}</span>
                <span><b>Telefone:</b> ${lubango.telefone}</span>
                <span><b>Local:</b> ${lubango.local}</span>
            </li>
             `;
           })

           let lubangoCard = modalContainer.querySelector("#lubango");
           lubangoCard.innerHTML = cardLubango;
        }
     } catch (error) {
        console.log("erro!" + error);
     }

}

//////////////////////////-------------------Help end Cominicate problem
export function cominicateProblem(){

    if(TextLogin() == false) {
        navigate("/login");
    }
  
    modalContainer.classList.add('active');
    modalContainer.innerHTML = wiewHelpContainer();

    let bachAboutButton = modalContainer.querySelector("#bachAboutButton");

    bachAboutButton.addEventListener("click", ()=>{ calBack() });

}

////////////////////////////-----------------Seetings

export function seetingsPage(){
    modalContainer.classList.add('active');
    modalContainer.innerHTML = viewSeetings();
    playAuduo();

    let backSeetingsButton = modalContainer.querySelector("#backSeetingsButton");
    modalContainer.querySelector("#locationButton").addEventListener("click",()=>{
        navigate("/address");
    })
    backSeetingsButton.addEventListener("click", ()=>{ calBack() })
}

//////////////////------themeSystem 

export function changeTheme(){
    let correntTheme = localStorage.getItem("temeSystem");
    
    let newTheme = "";
    let newStatusBar = "";
  if(correntTheme == "light"){
    newTheme = "darck";
    newStatusBar = "#242424";
    themesystem(newTheme,newStatusBar);
    localStorage.setItem("temeSystem", newTheme);
    localStorage.setItem("StatusBarColor", newStatusBar);
  }
  else{
    newTheme = "light";
    newStatusBar = "#f6f6f6";
    themesystem(newTheme,newStatusBar);
    localStorage.setItem("temeSystem", newTheme);
    localStorage.setItem("StatusBarColor", newStatusBar);
  }
}

export function logLoutPage(){
   modalContainer.classList.add('logout');
   modalContainer.innerHTML = popUpView();
   let confirmButtons = modalContainer.querySelectorAll(".confBtn");
   
   confirmButtons.forEach((button,index)=>{
    button.addEventListener("click", ()=>{
        switch(index){
            case 0:
                alert("sair");
                closePopUp();
            break;

            case 1 :
                alert("nao sair");
                closePopUp();
            break;    

        }
    })
   })
   
    function closePopUp(){
        modalContainer.classList.remove('logout');
        modalContainer.innerHTML = "";
   }
}