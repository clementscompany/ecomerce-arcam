
 export default function Login(){
    return  `
    <section class="contentLogin">

        <div class="logo loginWord">
            <h4>Arcam<b>Gold</b>Fish</h4>
        </div>

        <h1 class="titleFormData">Login</h1>
          <small id="TextError" class="TextError"></small>
        <form action="#" id="formDadaLogin" class="formDadaLogin">
            <div class="inputBox">
            <input type="text" placeholder="Seu email ou telefone..." nme="email" id="inputEmail">
            <i class="bi bi-person-fill"></i>
            </div>

            <div class="inputBox">
            <input type="password" placeholder="Sua senha..." id="inputPass" name="password">
            <i class="bi bi-person-fill-lock" id="lookIcone"></i>
            </div>
            
            <div class="inputBox">
            <button id="loginBtn" class="loginBtn">Entrar</button>
            </div>
            <span class="a">Esqueceu a sua senha?</span>
            <span>ou</span>
            <div class="inputBox">
            <button class="cadastroBtn" id="cadastroBtn">Cadastre-se</button>
            </div>
        </form>
    </section>`;

} 


 export  function CadastroPage(){
    return  `
    <section class="contentLogin">
        <div class="logo loginWord">
            <h4>Arcam<b>Gold</b>Fish</h4>
        </div>
        <h1 class="titleFormData">Cadastre-se</h1>
          <small id="TextError" class="TextError"></small>
        <form action="#" id="formDadaLogin" class="formDadaLogin">
            <div class="inputBox">
            <input type="text" placeholder="Primeiro nome..." nme="nome" id="inputName">
            <i class="bi bi-person-fill"></i>
            </div>

            <div class="inputBox">
            <input type="text" placeholder="Sobrenome.."  name="sobreNome" id="inputSurname">
            <i class="bi bi-person-fill" id=""></i>
            </div>
            
            <div class="inputBox">
            <button id="nextCadastrateBtn" class="nextCadastrateBtn loginBtn">Próximo</button>
            </div>
            <span>Já tem uma conta?</span>
            <div class="inputBox">
            <button class="cadastroBtn"  id="enterButton">Login</button>
            </div>
        </form>
    </section>`;

} 

export function dadosContact(){

    return `
    <div class="inputBox">
    <input type="email" placeholder="Seu email.." nme="email" id="inputEmailContact">
    <i class="bi bi-envelope-at-fill"></i>
    </div>

    <div class="inputBox">
    <input type="tel" placeholder="Seu telefone..." id="inputTel" name="telefone">
    <i class="bi bi-telephone-fill"></i>
    </div>

    <div class="inputBox">
    <button id="successContact" class="nextCadastrateBtn loginBtn">Próximo</button>
    </div>

    <span>Já tem uma conta?</span>
    <div class="inputBox">
    <button class="cadastroBtn"  id="enterButton">Login</button>
    </div>

    `;
}

export function dadosPaddword(){

    return `
    <div class="inputBox">
    <input type="password" placeholder="Digite a sua senha..." nme="email" id="inputPassword">
    <i class="bi bi-lock-fill" id="paddwordToggle"></i>
    </div>

    <div class="inputBox">
    <input type="password" placeholder="Confirme a sua senha..." id="inputConfirmPassword">
    <i class="bi bi-lock-fill" id="passwordConfirme"></i>
    </div>

    <div class="inputBox">
    <button id="successPassword" class="nextCadastrateBtn loginBtn">Finalizar</button>
    </div>

    <span>Já tem uma conta?</span>
    <div class="inputBox">
    <button class="cadastroBtn"  id="enterButton">Login</button>
    </div>

    `;
}