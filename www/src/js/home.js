import { apiURL } from "../../Variables.js";
import adicionarProduto from "./addcart.js";
import { navigate } from "./functions.js";
import TextLogin from "./tests/testlogin.js";
import { miniSpinner, popUpError, viewHome, viewSlideimages } from "./views.js";
const bodyContainer = document.querySelector("#bodyContainer");
const modalContainer = document.querySelector("#modalContainer");
const navigator = document.querySelectorAll("#navigator > button");
const homeBtn = document.querySelector(".homeBtn");
const loadingPage = document.querySelector("#loadingPage");


export default async function homePage() {

   openLoad(); //Loading Page



   if (TextLogin() == false) {
      navigate("/login");
   } // check Login token

   try {

      var getData = await fetch(apiURL + "/store", {
         method: "GET"
      });
      if (getData.ok) {
         closeLoader();
         let data = await getData.json();

         if (data.list.loja) {

            const dataApp = [
               {
                  produtos: data.list.loja.produtos,
                  categorias: "",
                  classificados: "",
                  novos: "",
               }
            ]

            bodyContainer.innerHTML = viewHome(dataApp);
            modalContainer.classList.remove('active');
            navigator.forEach(btn => btn.classList.remove('active'));
            homeBtn.classList.add('active');

            var ilustraction = bodyContainer.querySelector("#ilustraction");
            var filterBy = bodyContainer.querySelector("#filterBy");
            var addButtonCart = document.querySelectorAll(".addButtonCart");
            /////// adicionar funces da pagina inicial
            ilustraction.addEventListener("click", () => {
               modalContainer.classList.add('blurConteiner');

               modalContainer.innerHTML = viewSlideimages();

               class slideImage {
                  constructor(id) {
                     this.slide = modalContainer.querySelector(`[data-slide="${id}"]`)
                     this.init();

                  }

                  activeSlide(index) {
                     this.active = index;
                     this.items = this.slide.querySelectorAll(".newSlideImage > .imageSlide");
                     this.items.forEach(element => element.classList.remove('active'));
                     this.items[index].classList.add('active');

                     this.thumbItems = this.slide.querySelectorAll(".newThumb > span");

                     this.thumbItems.forEach(item => item.classList.remove('active'));
                     this.thumbItems[index].classList.add('active');

                     ////--------Auto
                     this.autoSlide();

                  }

                  next() {
                     if (this.active < this.items.length - 1) {
                        this.activeSlide(this.active + 1);
                     }
                     else {
                        this.activeSlide(0);
                     }
                  }

                  prev() {
                     if (this.active > 0) {
                        this.activeSlide(this.active - 1);
                     }
                  }


                  autoSlide() {
                     clearInterval(this.interval);
                     this.interval = setInterval(this.next, 8000);
                  }

                  navigationButtons() {
                     const next = this.slide.querySelector("#next");
                     next.addEventListener("click", this.next);

                     const prev = this.slide.querySelector("#prev");
                     prev.addEventListener("click", this.prev);
                  }


                  init() {
                     this.next = this.next.bind(this);
                     this.prev = this.prev.bind(this);
                     this.navigationButtons();
                     this.activeSlide(0)


                  }
               }

               new slideImage('slide');

               let closeWindow = modalContainer.querySelector("#closeWindow");
               closeWindow.addEventListener("click", () => {
                  modalContainer.classList.remove('blurConteiner');
                  modalContainer.innerHTML = "";
               })

            });////-------end Slide images

            //////////----EventListeners 
            filterBy.addEventListener("click", () => { getCategoryList() });

            ///////---AddCard Buttons 
            addButtonCart.forEach((button) => {
               button.addEventListener("click", () => {
                  let id = button.value;
                  adicionarProduto(id);
               })
            })

            ////////////////////---------categories List
            async function getCategoryList() {
               let categorieList = bodyContainer.querySelector("#categorieList");
               categorieList.innerHTML = `
               <ul>  
                  <li><small>Carregandoa lista...</small></li>
               </ul>`;
            }


         } else if (data.list.emptyStore) {
            setError(data.list.emptyStore);
         }
      } else {
         setError("Algo deu Errado, ou problemas de ligação, por favor, tente novamente mais tarde!");
      }

   } catch (error) {
      setError("Algo deu Errado, ou problemas de ligação, por favor, tente novamente mais tarde! :" + error);
   }


   function openLoad() {
      loadingPage.classList.add('active');
      loadingPage.innerHTML = miniSpinner();
   }

   function closeLoader() {
      loadingPage.classList.remove('active');
      loadingPage.innerHTML = "";
   }

   function setError(message) {
      loadingPage.classList.add('active');
      loadingPage.innerHTML = popUpError(message);
      loadingPage.querySelector("#confBtn").addEventListener("click", () => {
         location.reload(true);
      })
   }

}
















