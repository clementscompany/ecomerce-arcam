import Carrinho from "./src/js/carrinho.js";
import { navigate, renderContent } from "./src/js/functions.js"
import homePage from "./src/js/home.js";
import leftMenu from "./src/js/menu.js";
import pesquisar from "./src/js/pesquisar.js";
import TextLogin from "./src/js/tests/testlogin.js";
import { AppLication, themesystem } from "./src/js/themesystem.js";
const buttonNavigator = document.querySelectorAll("#navigator > button");
const headerButton = document.querySelectorAll(".headerButton");
const botaoCarrinho = document.querySelector("#botaoCarrinho");
window.addEventListener("DOMContentLoaded", ()=>{

  if (TextLogin() == false) {
    navigate("/login");
  }
  /////navegacao com os botoes 
  buttonNavigator.forEach((button,index)=>{
    button.addEventListener("click", ()=>{
      switch(index){
        case 0:
          navigate('/produtos');
          buttonNavigator.forEach(element=> element.classList.remove('active'));
          button.classList.add('active');
        break;
        
        case 1:
          navigate('/home');
          homePage();
          buttonNavigator.forEach(element=> element.classList.remove('active'));
          button.classList.add('active');
        break;
        
        case 2:
          navigate('/chat');
          buttonNavigator.forEach(element=> element.classList.remove('active'));
          button.classList.add('active');
      }
    })
  })
  // ((((((((((((()))))))))))))  botoes header.... menu e pesquisar

  headerButton.forEach((button,index)=>{
    button.addEventListener("click", ()=>{
      switch(index){
        case 0 :
          leftMenu();
        break;
        
        case 1 :
          pesquisar();
        break;
      }
    })
  })


//   (((((((((((((((((((((((ver Carrinho de compras))))))))))))))))))))))) //
  botaoCarrinho.addEventListener("click",()=>{ Carrinho() });


  // ((((((((((((((((((((((((((/Change theme))))))))))))))))))))))))))
  let correntTheme = localStorage.getItem("temeSystem");
  let correntStatusBar = localStorage.getItem("StatusBarColor") || "#18191d";
  themesystem(correntTheme, correntStatusBar);
    
  renderContent();

  AppLication();
})
window.addEventListener("hashchange", renderContent, AppLication);
