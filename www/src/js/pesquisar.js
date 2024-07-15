import { searchView } from "./views.js";

const modalContainer = document.querySelector("#modalContainer");
export default function pesquisar(){

    modalContainer.classList.add('active');
    modalContainer.innerHTML = searchView();

    /////input 
    var voltarSearch = modalContainer.querySelector("#voltarSearch");
    var resultSearch = modalContainer.querySelector("#resultSearch");
    var buttonSearch = document.querySelector("#buttonSearch");
    var inputPesquisar = modalContainer.querySelector("#inputPesquisar");
    inputPesquisar.addEventListener("input", (e)=>{
        let data = e.target.value;
        if(data.length > 4){
            resultSearch.classList.add('active');
            let list = resultSearch.querySelectorAll("li");
            list.forEach((li)=>{
                li.addEventListener("click", (e)=>{
                   let result = e.target.textContent;
                   inputPesquisar.value = result;

                })
            })

           helpSearch(data);
        }
        else{
            resultSearch.classList.remove('active');
        }
    })


    voltarSearch.addEventListener("click", ()=>{
        modalContainer.innerHTML = "";
        modalContainer.classList.remove('active');
    })

    buttonSearch.addEventListener("click", ()=>{
       let valor = inputPesquisar.value
       buscarProduto(valor);
    })

    /////////////------------------------------------

    async function helpSearch(value){
        
    }
   /////////////-------------------------------------

   async function buscarProduto(produto){
    alert(produto);
   }


}