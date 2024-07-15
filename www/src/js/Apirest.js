import errorValidation from "./error.js";
import messageSucessLogin from "./messages.js";


///loginApi
export default async function logRequest(email,senha){
  let form = new FormData();
  form.append("email", email);
  form.append("senha", senha);

  try {
    let Sendata = await fetch("http://localhost/arcamapp/src/api/paginainicial.php",{
        method:"POST", 
        body: form
    });
    if(Sendata.ok){
        let data = await Sendata.json();
        if(data.senha){
           errorValidation("Email ou Senha de Usuario Incorrectas!");
        }
        if(data.erromail){
            errorValidation("Erro! email não é válido!");
        }
        if(data.sucess){
            messageSucessLogin("Email e Senha Confirmados Com Sucesso!");
        }
    }
    else{
        console.log("Erro", Sendata.statusText);
    }

  } catch (error) {
    console.log("erro", error);
  }

}

export  async function chackLogin(){
    try {
     let getData = await fetch("http://localhost/arcamapp/src/api/sessionverify.php",{
        method:"GET"
     });

     if(getData.ok){
        let data = getData.text();
        console.log(data);
     }

    } catch (error) {
        console.log("erro!" + error);
    }

}