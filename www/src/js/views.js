import { imageURL } from "../../Variables.js";
//////Cssimporting

export function viewHome([dataHome]){
  var containerProdutos = "";
  var containerProdutosNovos = "";

  if (dataHome.produtos) {
      if (dataHome.produtos.length >= 2) {
          dataHome.produtos.forEach((produto)=>{
            if (produto.nome.length > 22) {
              produto.nome = produto.nome.substring(0,17) + "...";
            }
          
            if (produto.estoque == 0) {
              produto.status = `Esgotado <i class="bi bi-exclamation-triangle-fill"></i>`;
            } else{
              produto.status = `Disponivel <i class="bi bi-check2-all"></i>`
            }
            containerProdutos += `
            <div class="card">
                <article>
                  <small>${produto.nome}</small>
                </article>
                <div class="imageProd">
                  <img src="${imageURL+produto.imagem}" alt="image">
                </div>
                <button class="Comprar addButtonCart" value="${produto.id}" >Adicionar<i class="bi bi-cart-plus-fill"></i></button>
                <h3 class="prices bold"><i class="bi bi-currency-dollar"></i>${produto.preco+" Kz"}</h3>
                <small>${ produto.status }</small>
              </div>`
          })
      } else{
        containerProdutos = `
        <div class="miniSpiner">
          <div class="spin1">
            <div class="spin2">
              <div class="spin3"></div>
            </div>
          </div>
        </div>
        <div class="miniSpiner">
          <div class="spin1">
            <div class="spin2">
              <div class="spin3"></div>
            </div>
          </div>
        </div>
        `
      }

    } if (dataHome.novo) {
      containerProdutosNovos = `
      
      <section class="profilloPRoduct">
          <article>
            <h4 class="myClass">Produtos Mais vendidos</h4>
          </article>
        
          <div class="pdt">
            <article>
              <small><b>Creatina Dog</b></small><br>
              <small>Disponivel <i class="bi bi-check2-all"></i></small>
            </article>

            <div class="imageProd">
              <img src="./src/img/creatina.jpg" alt="image">
            </div>

            <div class="deiailsProd">
              <button class="loved likeProduto"><i class="bi bi-suit-heart-fill"></i></button>
              <button class="comment"><i class="bi bi-chat-right"></i></button>
              <button class="buyButton addButtonCart" value="122"><i class="bi bi-cart-plus-fill"></i></button>
            </div>

            <div class="estatisticas">
              <small>Mais de 199.pessoas Comentaram</small>
            </div>
          </div>
    </section>
      
      
      `
    }

    
  
  return `
    <section class="ilustraction" >
      <div class="emAlta" id="filterBy">
        <h5>Filtrar por categorias </h5>
        <i class="bi bi-sliders"></i>
      </div>
        <section class="categorias" id="categorieList">
                
        </section>
        
        <div class="slideImage">
          <img src="./src/img/banner1.jpg" alt="Image">
        </div>
        <div class="publication">
          <button class="toggle buyRound addButtonCart" value="12">
           Comprar agora <i class="bi bi-cart4"></i>
          </button>
        </div>
    </section>  

       
    
   <div class="emAlta"><h5>Diversos produtos em alta  </h5><i class="bi bi-shop"></i></div>
    

  <section class="bodyContent">
    ${containerProdutos}
  </section>

     
    <div class="emAlta" id="ilustraction">
      <h5>Lançamento de novos produtos  </h5>
      <i class="bi bi-megaphone-fill"></i>
    </div>
  

`;
}

export function viewProdutos(){

    return `
          <section class="profilloPRoduct">

              <article>
                <h1 class="topicPage">ArcamGolFish | Produtos</h1>
              </article>

              <div class="pdt">
                <article>
                  <small><b>Creatina Dog</b></small><br>
                  <small>Disponivel <i class="bi bi-check2-all"></i></small><br>
                  <small></i>12000kz <i class="bi bi-check2-all"></i></small>
                </article>

                <div class="imageProd">
                  <img src="./src/img/creatina.jpg" alt="image">
                </div>

                <div class="deiailsProd">
                  <button class="loved likeProduto"><i class="bi bi-suit-heart-fill"></i></button>
                  <button class="comment"><i class="bi bi-chat-right"></i></button>
                  <button class="buyButton"><i class="bi bi-cart-plus-fill"></i></i></button>
                </div>
                <div class="pdt">

                <div class="estatisticas">
                  <small>Mais de 199.pessoas Comentaram</small>
                </div>

              </div>
          </section>
`;

}

export function viewChat(data){
  let containerPedidos = "";
  if (data.pedidos) {
    
    data.pedidos.forEach(pd=>{
      containerPedidos +=`
        <div class="message incamming">
          <ul id="${pd.pedidoid}">
            <li><i class="bi bi-card-checklist"></i><b>Pedido Nº# ${pd.pedidoid}</b></li>
            <li><b>Total:</b> ${pd.total_pedido}</li>
            <li><b>Status:</b> ${pd.status_pedido}</li>
            <div class="deleteOrdre">
              <small>O seu pedido será atendido em breve! <br><small>${pd.date_pedido}</small></small>
              <button id="deletePedido" value="${pd.pedidoid}"><i class="bi bi-trash-fill"></i></button>
            </div>
          </ul>
        </div>
      `
    })
  } else{
    containerPedidos = `
        <div class="message incamming">
          <ul>
            <li>${data.error}</li>
          </ul>
        </div>
    `;
  }


  return  `
  <div class="chatArea">
  <button class="toggle"><i class="bi bi-arrow-left"></i></button>
   <h4>Seus pedidos</h4>
  <button class="toggle"><i class="bi bi-whatsapp"></i></button>
  </div>
  <div class="conteinerChat">
    ${containerPedidos}
  </div>

  <div class="messageInput">
    <div class="statusContainer">
       <small>Status do pedido atual: <b>Pendente...</b></small>
    </div>
  </div>
  `;
}
export function searchView(){
  return `
  <div class="searchBox">
    <button class="toggle" id="voltarSearch"><i class="bi bi-arrow-left"></i></button>
     <div class="inputSearch">
      <input type="search" placeholder="Pesquisar..." id="inputPesquisar">
     </div> 
     <button class="toggle" id="buttonSearch"><i class="bi bi-search"></i></button>
  </div>

  <ul class="resultSearch" id="resultSearch">
    <li tabindex="0"><span>Amutraz Calbos</span></li>
    <li><span>Amutraz Calbos</span></li>
  </ul>
  
  `;
}

export function viewListMenu(){
  return `
  <ul class="liststMenu">
     <li class="topLostMenu">
     <span>Moisesclemente</span>
     <button class="toggle" id="buttonClosingMenuBar"><i class="bi bi-arrow-right"></i></button>
     </li>

     <li class="list">
     <i class="bi bi-bell"></i><span>Notificações</span>
     </li>

     <li class="list">
     <i class="bi bi-journal-bookmark-fill"></i><span>Sobre Nós</span>
     </li>

     <li class="list">
     <i class="bi bi-geo-alt-fill"></i><span>Nossas Lojas</span>
     </li>

     <li class="list">
     <i class="bi bi-info-circle"></i> <span>Comunicar um problema</span>
     </li>

     <li class="list">
     <i class="bi bi-gear"></i><span>Definições</span>
     </li>

     <li class="list">
     <i class="bi bi-toggles"></i><span>Alterar o Tema</span>
     </li>

     <li class="list">
     <i class="bi bi-power"></i><span>Terminar Sessão</span>
     </li>
  </ul>`
  ;
}

export function notificationView(){
  return`
  <div class="containerNot">
    <div class="topNotifications">
      <button class="toggle" id="backButtonNot"><i class="bi bi-arrow-left-short"></i></button> <h2>Notificações</h2>
    </div>

  <ul class="ListNotifications">

    <li class="CardNot">
      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius placeat nesciunt sint, magnam facere maiores et deleniti fugiat neque nemo dolore, sit dolor aut voluptatibus velit voluptate? Recusandae, labore eius?
      </span>
    </li>

   </ul>

  </div>
  `;
}

export function aboutUsview(){
  return `
  <div>
  <div class="topNotifications">
    <button class="toggle" id="AboutButton"><i class="bi bi-arrow-left-short"></i></button> <h2>Sobre Nos</h2>
  </div>

  <div class="ListNotifications" >
    <ul id="listAboutUs"></ul>
    <ul id="listMoreAboutUs"></ul>
  </dov>

  </div>
  `;
}

export function locationsHomeView(){
  return `
  <div>
  <div class="topNotifications">
    <button class="toggle" id="locationButton"><i class="bi bi-arrow-left-short"></i></button> <h2>Nossas Lojas</h2>
  </div>

  <div class="ListNotifications" >
    <ul id="luanda"></ul>
    <ul id="benguela"></ul>
    <ul id="lubango"></ul>
  </dov>

  </div>
  `;
}

export function wiewHelpContainer(){
  return `
    <section class="helpConteiner">
          <div class="topNotifications">
            <button class="toggle" id="bachAboutButton"><i class="bi bi-arrow-left-short"></i></button> 
            <h2>Ajuda</h2>
          </div>

          <ul class="listOptionHelp ListNotifications">
           <li>
            <small class="bold">Comp usar o App?</small>
             <p class="pp">
              Caso tenha dificuldades e usar o app, você pode Ler nosso 
              <a href="#">Manual de instruções</a> ou então, você pode segui o tuttorial paea entender a 
              funcionalidade do nosso app
             </p>
           </li>

            <li>
            <small class="bold">Problemas com o uso da app?</small>
             <p class="pp">
              Contacte a nossa central de atendimento ao cliennte atraves do nosso
              <a href="#" target="_blank">Whatsapp</a>
             </p>
           </li>

           <li>
            <small class="bold">Descrever um problema específico</small>
             <p class="pp">
               Caso você queira descrever específicamente um problema envie nós o seu feedback
               para tentar solucionar o problema
             </p>

            <textarea name="" id="" class="textarea" cols="30" rows="10"></textarea>
            <button class="toggle send">Enviar feedback</button>
           </li>
          </ul>
    </section>
        `;
}

export function viewSeetings(){
  return `
        <section class="infoPerfilContainer ListNotifications">
          <div class="topNotifications seetings">
            <button class="toggle" id="backSeetingsButton"><i class="bi bi-arrow-left-short"></i></button> 
            <h2>Definições</h2>
          </div>

         <div class="cardUserInfo">
          <i class="bi bi-person-circle iconPerson"></i>
          <h3>Moises clemente</h3>
          <small>ajbcompany4881@gmail.com</small>
         </div>
         <div class="cdd">
          <h3>Dados pessoais</h3>
         </div>
         <div class="data">
          <ul class="listInfoUser">
            <li><span><b>Nome: </b> Moises clemente</span></li>
            <li><span><b>Email: </b> ajbcompany4881@gmail.com</span></li>
            <li><span><b>Telefone: </b> 932 240 190</span></li>
            <li><span><b>Senha: </b> 488***</span></li>
            <li><button class="toggle send">Alterar os Dados </button></li>
          </ul>

          <form action="#" method="POST" class="formUpdate">
            <small id="ErrorText">ErrorText</small>
            <div class="inputBox replace">
              <input type="text" placeholder="Novo nome..." autocomplete="off">
              <i class="bi bi-person-gear"></i>
            </div>

            <div class="inputBox replace">
              <input type="email" placeholder="Novo email..." autocomplete="off">
              <i class="bi bi-person-gear"></i>
            </div>

            <div class="inputBox replace">
              <input type="password" placeholder="Nova Senha..." autocomplete="off">
              <i class="bi bi-person-lock"></i>
            </div>

            <div class="inputBox replace">
              <input type="password" placeholder="Confirme a senha nova.." autocomplete="off"> 
              <i class="bi bi-person-lock"></i>
            </div>

            <div class="inputBox replace">
              <button>Salvar</button>
            </div>

          </form>
         </div>

         <div class="cdd">
          <h3>A minha localização <i class="bi bi-geo-alt-fill"></i></h3>
         </div>

         <div class="data">
          <ul class="listInfoUser">
             <li>
              <small>Nenhuma localização definida... Deseja definir a sua Localização?</small>
            </li>
            <li>
              <button class="toggle send locationButton" id="locationButton">
                Adicione a sua Localização <i class="bi bi-plus"></i>
              </button>
            </li>
          </ul>
         </div>

      </section>`;
}

export function popUpView(message) {
  return `
    <div class="popUpConent">
       <div class="popUpWord">
         <span>${message}</span>
       </div>
      <div class="confirmButtons" id="#confirmButtons">
        <button class="confBtn">Sim</button>
        <button class="confBtn">não</button>
      </div>
    </div>
  `;
}

export function viewSlideimages(){
  return `
  <section class="ilustraction"  data-slide="slide">
        <button class="closeWindow" id="closeWindow"><i class="bi bi-x-lg"></i></button>
          
          <div class="thumb newThumb">
          <span></span>
          <span></span>
          </div>
           <h4 class="destaque">Produtos em Destaque</h4>
          <div class="slideImage newSlideImage">
            <img src="./src/img/amitraz.jpg" alt="Image" class="imageSlide">
            <img src="./src/img/amitraz200.jpg" alt="Image" class="imageSlide">
          <div>
            <div class="buttinsSlideNav" id="next"></div>
            <div class="buttinsSlideNav" id="prev"></div> 
          </div>  

           <div class="aboutSlide">
            <button class="toggle comprar">Com interesse </button>
            <div class="stars">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
              <i class="bi bi-star-half"></i>
            </div>
          </div>              
        </div>
  </section>  
    `;
}


export function wiewAddCart(produto){
  if (produto.status === "Dispinivel") {
    produto.status = `Disponnivel<i class="bi bi-check2-all"></i>`;
  } else{
    produto.status = `Esgotado <i class="bi bi-exclamation-triangle-fill"></i>`;
  }
  return `
     <div class="topNavigation">
        <button class="toggle"><i class="bi bi-arrow-left"></i></button>
        <h3>Adicionar produto</h3>
      </div>
      <section class="contentSelection">
        <h4>Informacoes dopre o produto</h4>
        <div class="card addCardCard">
          <div class="leftCard">
            <div class="image">
              <img src="${imageURL+produto.imagem}" alt="image">
            </div>
          </div>
          <div class="rightCard">
            <h3><i class="bi bi-coin"></i> ${produto.preco} kz</h3>
            <small>${produto.nome}</small><br> 
            <small>${produto.status}</small>
          </div>
        </div>

        <div class="card cd">
           <h3>${produto.titulo}</h3>
           <small>Estoque atual do produto: ${produto.estoque}</small><br>
           <p>${""}</p>
        </div>

        <div class="card cd">
           <h3 class="title">Descrição do produto</h3>
           
           <small class="description">
              ${produto.descricao}
           </small><br>
        </div>

        <div class="bottomCard">
          <div class="calc">
            <p class="prices"><b>Taixa de entrega:</b> 2700 kz</p>
            <p class="prices" id="totalCard"></p>
            <small>21/02/2024</small><br>
            <small>Arcam Gold Fish LDA | Luanda/Angola <i class="bi bi-geo-alt"></i></small>
          </div>
          <div class="gridCard">
           <div class="leftBottom" id="buttonsRec">
            <button class="thisButton" id="maisButton"><i class="bi bi-plus-lg"></i></button>
             <input type="number" id="quantidadeInput" value="1">
            <button class="thisButton" id="menosButton"><i class="bi bi-dash"></i></button>
           </div>

          <div class="rightBottom">
            <button class="thisButton" id="adicionarButton">Adicionar </button>
          </div>

          </div>

        </div>
      </section>
      `;
}

export function viewCarrinho(data){
  var card = "";
  data.produtos.forEach(element=>{
    card += `
          <ul class="listOrders card">
          <li>Produto: ${element.nomeproduto}</li>
          <li>Quantidade: ${element.quantity}</li>
          <li>Preço unitário: ${element.preco} Kz</li>
          <li class="removeButtonList">
            <button class="toggle" id="deleteCardButton" value="${element.product_id}">
                <i class="bi bi-trash"></i>
            </button>
          </li>
          </ul>
    `;
  })
  return (`

        <section class="carrinhoDeCompras">
         <div class="topCarrinho">
          <button class="toggle" id="closeCarrinho"><i class="bi bi-arrow-left"></i></button>
          <h3>Meu carrinho  <i class="bi bi-cart4"></i></h3>
         </div>
         <div class="buttonsOptionsCard">
             <small>Preferencias de entrega</small>
            <div class="choiseButtons" id="choiseButtons">
              <button class="active escolher">Receber em casa</button>
              <button class="escolher">Retirar na loja</button>
            </div>
         </div>
          ${ card }
         <div class="bottomCartContainer">
          <ul>
            <li>
              <span class="prices"><b>Total do produto: </b><i class="bi bi-cash-stack"></i> ${data.total} Kz</span>
            </li>
            <li>
              <span class="prices"><b>Taixa de entrega: </b><i class="bi bi-cash-stack"></i> 12000 kz</span>
            </li>
            <li><Small>Arcam Gold Fish LDA, Luanda/Angola</Small></li>
          </ul>
         <div class="">
          <button class="finalizeButton" id="finalizeButton">Fazer o pedido</button>
         </div>
         </div>
      </section>
  `);
}

export function miniSpinner(){
  return(`
    <div class="miniSpiner">
      <div class="spin1">
        <div class="spin2">
          <div class="spin3"></div>
        </div>
      </div>
    </div>
    `);
}


export function spinnerButton(){
  return(`
    <div class="spinnerButton">
      <div class="spin1">
        <div class="spin2"></div>
      </div>
    </div>
    `);
}

export function reloadButton(){
  return(
`    <div class="inputBox">
        <button class="cadastroBtn"  id="reloadButton">Voltar ao Inicio</button>
    </div>`
  );
}

export function AddressFunction(location){
  var municipios = "";
  location.municipios.forEach(element => {
    municipios += `<option value="${element.nome}">${element.nome}</option>`
  })
  var locationBairros = "";
  location.bairros.forEach(bairro=>{
    locationBairros += `<option value="${bairro}">${bairro}</option>`
  });

  return(`
    <section class="addressContainer">

        <div class="topAddressContainer">
          <button id="calBackButton"><i class="bi bi-arrow-left"></i></button> 
          <h4>Adicione a sua localização</h4>
          <i class="bi bi-geo-alt-fill"></i>
        </div>

        <form class="formAddress" id="formAddress" method="POST">
          <div class="inputBox cdd">
            <label for="provincia">Província</label>
            <select name="provincia" id="provincia">
              <option value="${location.provincia}">${location.provincia}</option>
            </select>
          </div>

          <div class="inputBox cdd">
            <label for="municipio">Município</label>
            <select name="municipio" id="municipio">
              ${municipios}
            </select>
          </div>

          <div class="inputBox cdd">
            <label for="bairro">Bairro</label>
            <select name="bairro" id="bairro">
              ${locationBairros}
            </select>
          </div>

          <div class="inputBox cdd">
            <label for="nome">Nomeie a sua localização</label>
            <input type="text" name="nome" id="nome" class="inputData" placeholder="Ex: Casa, Trabalho ou escola...">
          </div>

          <div class="inputBox cdd">
            <label for="detalhes">Detalhes</label>
            <textarea name="detalhes" class="inputData" id="detalhes" placeholder="Coloque mais detalhes sobre a tua localização!"></textarea>
          </div>

          <div class="inputBox">
            <button id="adicionarLocation">Adicionar</button>
          </div>
        </form>

      </section>`
    );
}

export function popUpError(message) {
  return `
    <div class="popUpConent ErrorPopUp">
       <div class="popUpWord">
         <span>${message}</span>
       </div>
      <div class="confirmButtons" id="#confirmButtons">
        <button class="confBtn" id="confBtn">ok</button>
      </div>
    </div>
  `;
}

export function checkLocation(locations){
  
  var cardLocations = "";
  var style = "";
  if(locations.local){

    locations.local.forEach((local)=>{
      cardLocations+= `       
            <li id="${local.id}" class="homeData">
              <div class="topList">
                <i class="bi bi-geo-alt-fill"></i>
                <h4>${local.nome}</h4>
              </div>
              <small><b>${local.provincia}</b>, ${local.municipio}, ${local.bairro}</small><br>
              <small>
                <b>Delatlhes:</b>
                 ${local.detalhes}
              </small>
            </li>`;
    })
  } else{
      cardLocations =`       
          <div class="inputBox">
              <button id="adicionarLocation" onclick="window.location.hash ='/address'">
                Adicionar localização
              </button>
          </div>
        `;
      style = "disabled";
       
  }
  return(`
        <section class="containerLocation">
         <div class="topContainerLocation">
            <button id="calBackButton"><i class="bi bi-arrow-left"></i></button> 
            <h4>Escolha a sua localização</h4>
         </div>

         <ul class="locarionList">
              ${ cardLocations }
         </ul>

         <button class="nextButton" ${style} id="nextButton">
          <i class="bi bi-arrow-right"></i>
        </button>
      </section>
    
    `);
}

export function paymentViews(payments){

  return(`
        <section class="containerLocation payMentsConteiner">
          <div class="topContainerLocation">
            <button id="calBackButton"><i class="bi bi-arrow-left"></i></button> 
            <h4>Escolha a sua localização</h4>
          </div>

          <ul class="locarionList">
            <li id="" class="homeData">
              <div class="topList topPaymentMethod">
                <i class="bi bi-credit-card-2-back"></i>
                <h4>TPA</h4>
              </div>
              <small><b>Padrão</b></small><br>
              <small>Pagamento no Local da entrega receba o seu pedido em menos de 2 horas úteis.</small>
            </li>

            <li id="" class="homeData">
              <div class="topList topPaymentMethod">
                <i class="bi bi-phone-flip"></i>
                <h4>EXPRESS</h4>
              </div>
              <small><b>Rápido</b></small><br>
              <small>Pagamento no Local da entrega receba o seu pedido em menos de 2 horas úteis.</small>
            </li>
  

          <li id="" class="homeData">
            <div class="topList topPaymentMethod">
              <i class="bi bi-bank"></i>
              <h4>Transferência</h4>
            </div>
            <small><b>Lento</b></small><br>
            <small>Receberá uma notificação, após confirmarmos a transferência efetuada dos valores</small>
          </li>

          </ul>

      </section>
    `);
}

export function resumePedido(payments){
 var local = payments.confirm.address;
 var data = payments.confirm.pedido.sucess
 var total = payments.confirm.pedido.total

 var content = "";
 data.forEach((element)=>{

  content+= `
    
        <small><b>Produto:</b> ${element.nomeproduto}</small><br>
        <small><b>Quantidade:</b> ${element.quantity}</small> <br>
  `
 })

  return(`
        <section class="containerLocation payMentsConteiner">
          <div class="topContainerLocation">
            <button id="calBackButton"><i class="bi bi-arrow-left"></i></button> 
            <h4>Confirme o pedido</h4>
          </div>

          <ul class="locarionList">
            <li id="" class="homeData">
              Detalhes do pedido
            </li>
            <li id="" class="homeData">
              <div class="topList">
                <i class="bi bi-geo-alt-fill"></i>
                <h4>${local.nome}</h4>
              </div>
              <small><b>${local.provincia}</b>, ${local.municipio}, ${local.bairro}</small><br>
              <small>
                <b>Delatlhes:</b>
                 ${local.detalhes}
              </small>
              <br>
              <br>

              ${content}
            </li>

            <div class="totals">
                <h4><b>Total a pagar: </b>${total} Kz</h4>
                <h4><b>Taica de entrega: </b> 2.000,00 Kz</h4>
            </div>
            
          </ul>

            <button class="nextButton" id="nextButton">
                <i class="bi bi-check2-all"></i>
            </button>
      </section>
    `);
}

