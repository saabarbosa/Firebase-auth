// buttons

var authEmailPassButton = document.getElementById('authEmailPassButton');
var createUserButton = document.getElementById('createUserButton');

var authGoogleButton = document.getElementById('authGoogleButton');
var authMicrosoftButton = document.getElementById('authMicrosoftButton');
//var authGithubButton = document.getElementById('authGithubButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var erroLoginMessage = document.getElementById('erroLogin');


// forget password
var lnkForgetPassword = document.getElementById('lnkForgetPassword');
var authForgetPassword = document.getElementById('authForgetPassword');
var emailInputForget = document.getElementById('emailInputForget');
var erroRegisterMessage = document.getElementById('erroRegister');

// inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

var emailRegisterInput = document.getElementById('emailRegisterInput');
var passwordRegisterInput = document.getElementById('passwordRegisterInput');
var passwordConfirmRegisterInput = document.getElementById('passwordConfirmRegisterInput');
var firstNameRegisterInput = document.getElementById('firstNameRegisterInput');
var lastNameRegisterInput = document.getElementById('lastNameRegisterInput');


// criar novo usuario
createUserButton.addEventListener('click', function () {
    erroRegisterMessage.innerHTML = "<div style=\"text-align:center\"><img src=\"img/loading.gif\" alt=\"carregando...\" /></div>";
    firebase.auth().createUserWithEmailAndPassword(emailRegisterInput.value, passwordRegisterInput.value).then(function () {
            var fullName = firstNameRegisterInput.value + ' ' + lastNameRegisterInput.value;
            sessionStorage.setItem('fullname', fullName);
            $('#myModal').modal('hide');
            erroRegisterMessage.innerHTML = "";
     }).catch(function(error){
            console.log(error.code);
            console.log(error.message);
            var errorMessage = this.VerifyErroCode(error.code);
            erroRegisterMessage.innerHTML = "<div style=\"text-align:center; color:red\">" + errorMessage + "</div>";

     });
});

// esquecimento senha
lnkForgetPassword.addEventListener('click', function () {
    $('#myModal').modal('hide');
    $('#myModal2').modal('show');
});


authForgetPassword.addEventListener('click', function () {
    var email = emailInputForget.value;
    if (email.value != '') {
        erroRegisterForget.innerHTML = "<div style=\"text-align:center\"><img src=\"img/loading.gif\" alt=\"verificando...\" /></div>";
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            erroRegisterForget.innerHTML = "<div style=\"text-align:center; color:blue\">Foi enviado um email, favor verificar.</div>";
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            var errorMessage = this.VerifyErroCode(error.code);
            erroRegisterForget.innerHTML = "<div style=\"text-align:center; color:red\">" + errorMessage + "</div>";
        });
    } else {
        erroRegisterForget.innerHTML = "<div style=\"text-align:center; color:red\">Por favor, informe um e-mail.</div>";
    }

});


// autenticar usuario
authEmailPassButton.addEventListener('click', function () {
    erroLoginMessage.innerHTML = "<div style=\"text-align:center\"><img src=\"img/loading.gif\" alt=\"carregando...\" /></div>";
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value).then(function (result) {
        console.log(result);
        $('#myModal').modal('hide');
        erroLoginMessage.innerHTML = "";
    }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        var errorMessage = this.VerifyErroCode(error.code);
        erroLoginMessage.innerHTML = "<div style=\"text-align:center; color:red\">" + errorMessage + "</div>";
    });
});

// autenticar google
authGoogleButton.addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    sessionStorage.removeItem('fullname');
    signIn(provider);
    
});

// autenticar github
//authGithubButton.addEventListener('click', function () {
//    var provider = new firebase.auth.GithubAuthProvider();
//    provider.addScope('profile');
//    provider.addScope('email');
//    sessionStorage.removeItem('fullname');
//    signIn(provider);
   
//});

// autenticar facebook
authFacebookButton.addEventListener('click', function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    sessionStorage.removeItem('fullname');
    signIn(provider);
   
});


// autenticar com provedor escolhido/
function signIn(provider) {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
        var token = result.credential.accesstoken;
        var user = result.user;
        $('#myModal').modal('hide');
        erroLoginMessage.innerHTML = "";
    }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        var errorMessage = this.VerifyErroCode(error.code);
        erroLoginMessage.innerHTML = "<div style=\"text-align:center; color:red\">" + errorMessage + "</div>";
    });
}

// traduzir mensagem de erro
function VerifyErroCode(errorCode) {
    switch (errorCode) {
        case 'auth/app-deleted':
            return 'O banco de dados não foi localizado.';
        case 'auth/expired-action-code':
            return 'O código da ação o ou link expirou.';
        case 'auth/invalid-action-code':
            return 'O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.';
        case 'auth/user-disabled':
            return 'O usuário correspondente à credencial fornecida foi desativado.';
        case 'auth/user-not-found':
            return 'O usuário não correponde à nenhuma credencial.';
        case 'auth/weak-password':
            return 'A senha é muito fraca.';
        case 'auth/email-already-in-use':
            return 'Já existi uma conta com o endereço de email fornecido.';
        case 'auth/invalid-email':
            return 'O endereço de e-mail não é válido.';
        case 'auth/operation-not-allowed':
            return 'O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.';
        case 'auth/account-exists-with-different-credential':
            return 'E-mail já associado a outra conta.';
        case 'auth/auth-domain-config-required':
            return 'A configuração para autenticação não foi fornecida.';
        case 'auth/credential-already-in-use':
            return 'Já existe uma conta para esta credencial.';
        case 'auth/operation-not-supported-in-this-environment':
            return 'Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https.';
        case 'auth/timeout':
            return 'Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações.';
        case 'auth/missing-android-pkg-name':
            return 'Deve ser fornecido um nome de pacote para instalação do aplicativo Android.';
        case 'auth/missing-continue-uri':
            return 'A próxima URL deve ser fornecida na solicitação.';
        case 'auth/missing-ios-bundle-id':
            return 'Deve ser fornecido um nome de pacote para instalação do aplicativo iOS.';
        case 'auth/invalid-continue-uri':
            return 'A próxima URL fornecida na solicitação é inválida.';
        case 'auth/unauthorized-continue-uri':
            return 'O domínio da próxima URL não está na lista de autorizações.';
        case 'auth/invalid-dynamic-link-domain':
            return 'O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual.';
        case 'auth/argument-error':
            return 'Verifique a configuração de link para o aplicativo.';
        case 'auth/invalid-persistence-type':
            return 'O tipo especificado para a persistência dos dados é inválido.';
        case 'auth/unsupported-persistence-type':
            return 'O ambiente atual não suportar o tipo especificado para persistência dos dados.';
        case 'auth/invalid-credential':
            return 'A credencial expirou ou está mal formada.';
        case 'auth/wrong-password':
            return 'Senha incorreta.';
        case 'auth/invalid-verification-code':
            return 'O código de verificação da credencial não é válido.';
        case 'auth/invalid-verification-id':
            return 'O ID de verificação da credencial não é válido.';
        case 'auth/custom-token-mismatch':
            return 'O token está diferente do padrão solicitado.';
        case 'auth/invalid-custom-token':
            return 'O token fornecido não é válido.';
        case 'auth/captcha-check-failed':
            return 'O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.';
        case 'auth/invalid-phone-number':
            return 'O número de telefone está em um formato inválido (padrão E.164).';
        case 'auth/missing-phone-number':
            return 'O número de telefone é requerido.';
        case 'auth/quota-exceeded':
            return 'A cota de SMS foi excedida.';
        case 'auth/cancelled-popup-request':
            return 'Somente uma solicitação de janela pop-up é permitida de uma só vez.';
        case 'auth/popup-blocked':
            return 'A janela pop-up foi bloqueado pelo navegador.';
        case 'auth/popup-closed-by-user':
            return 'A janela pop-up foi fechada pelo usuário sem concluir o login no provedor.';
        case 'auth/unauthorized-domain':
            return 'O domínio do aplicativo não está autorizado para realizar operações.';
        case 'auth/invalid-user-token':
            return 'O usuário atual não foi identificado.';
        case 'auth/user-token-expired':
            return 'O token do usuário atual expirou.';
        case 'auth/null-user':
            return 'O usuário atual é nulo.';
        case 'auth/app-not-authorized':
            return 'Aplicação não autorizada para autenticar com a chave informada.';
        case 'auth/invalid-api-key':
            return 'A chave da API fornecida é inválida.';
        case 'auth/network-request-failed':
            return 'Falha de conexão com a rede.';
        case 'auth/requires-recent-login':
            return 'O último horário de acesso do usuário não atende ao limite de segurança.';
        case 'auth/too-many-requests':
            return 'As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.';
        case 'auth/web-storage-unsupported':
            return 'O navegador não suporta armazenamento ou se o usuário desativou este recurso.';
        case 'auth/invalid-claims':
            return 'Os atributos de cadastro personalizado são inválidos.';
        case 'auth/claims-too-large':
            return 'O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte.';
        case 'auth/id-token-expired':
            return 'O token informado expirou.';
        case 'auth/id-token-revoked':
            return 'O token informado perdeu a validade.';
        case 'auth/invalid-argument':
            return 'Um argumento inválido foi fornecido a um método.';
        case 'auth/invalid-creation-time':
            return 'O horário da criação precisa ser uma data UTC válida.';
        case 'auth/invalid-disabled-field':
            return 'A propriedade para usuário desabilitado é inválida.';
        case 'auth/invalid-display-name':
            return 'O nome do usuário é inválido.';
        case 'auth/invalid-email-verified':
            return 'O e-mail é inválido.';
        case 'auth/invalid-hash-algorithm':
            return 'O algoritmo de HASH não é uma criptografia compatível.';
        case 'auth/invalid-hash-block-size':
            return 'O tamanho do bloco de HASH não é válido.';
        case 'auth/invalid-hash-derived-key-length':
            return 'O tamanho da chave derivada do HASH não é válido.';
        case 'auth/invalid-hash-key':
            return 'A chave de HASH precisa ter um buffer de byte válido.';
        case 'auth/invalid-hash-memory-cost':
            return 'O custo da memória HASH não é válido.';
        case 'auth/invalid-hash-parallelization':
            return 'O carregamento em paralelo do HASH não é válido.';
        case 'auth/invalid-hash-rounds':
            return 'O arredondamento de HASH não é válido.';
        case 'auth/invalid-hash-salt-separator':
            return 'O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido.';
        case 'auth/invalid-id-token':
            return 'O código do token informado não é válido.';
        case 'auth/invalid-last-sign-in-time':
            return 'O último horário de login precisa ser uma data UTC válida.';
        case 'auth/invalid-page-token':
            return 'A próxima URL fornecida na solicitação é inválida.';
        case 'auth/invalid-password':
            return 'A senha é inválida, precisa ter pelo menos 6 caracteres.';
        case 'auth/invalid-password-hash':
            return 'O HASH da senha não é válida.';
        case 'auth/invalid-password-salt':
            return 'O SALT da senha não é válido.';
        case 'auth/invalid-photo-url':
            return 'A URL da foto de usuário é inválido.';
        case 'auth/invalid-provider-id':
            return 'O identificador de provedor não é compatível.';
        case 'auth/invalid-session-cookie-duration':
            return 'A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas.';
        case 'auth/invalid-uid':
            return 'O identificador fornecido deve ter no máximo 128 caracteres.';
        case 'auth/invalid-user-import':
            return 'O registro do usuário a ser importado não é válido.';
        case 'auth/invalid-provider-data':
            return 'O provedor de dados não é válido.';
        case 'auth/maximum-user-count-exceeded':
            return 'O número máximo permitido de usuários a serem importados foi excedido.';
        case 'auth/missing-hash-algorithm':
            return 'É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários.';
        case 'auth/missing-uid':
            return 'Um identificador é necessário para a operação atual.';
        case 'auth/reserved-claims':
            return 'Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.';
        case 'auth/session-cookie-revoked':
            return 'O COOKIE da sessão perdeu a validade.';
        case 'auth/uid-alread-exists':
            return 'O indentificador fornecido já está em uso.';
        case 'auth/email-already-exists':
            return 'O e-mail fornecido já está em uso.';
        case 'auth/phone-number-already-exists':
            return 'O telefone fornecido já está em uso.';
        case 'auth/project-not-found':
            return 'Nenhum projeto foi encontrado.';
        case 'auth/insufficient-permission':
            return 'A credencial utilizada não tem permissão para acessar o recurso solicitado.';
        case 'auth/internal-error':
            return 'O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.';
        default:
            return null;
    }
}

// Observar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (user) {
        //online
        createLogadoLink();
    } else {
        //offline
        createLoginLink();
        setInterval(function () { blockPages() }, 20000);
    }
});

function createLogadoLink() {
    
    var login_html = "<button type=\"button\" class=\"btn btn-dark dropdown-toggle\" data-toggle=\"dropdown\">";
    login_html += firebase.auth().currentUser.email;
    login_html += "</button >";
    login_html += "<div class=\"dropdown-menu\">";
    login_html += "   <a class=\"dropdown-item\" href=\"#\">Meu Painel</a>";
    login_html += "   <div class=\"dropdown-divider\"></div>";
    login_html += "   <a class=\"dropdown-item\" href=\"#\" id=\"linkLogout\" >Sair</a>";
    login_html += "</div>";
    login.innerHTML = login_html;

    // Logout
    linkLogout.addEventListener('click', function () {
        AuthSignExit();
    });

}

function AuthSignExit() {
    firebase.auth().signOut().then(function (result) {
        console.log(result);
        //removeLogadoLink();
        createLoginLink();
        sessionStorage.removeItem('fullname');
        //location.href = '/';
    }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        alert('Falha ao deslogar, verifique o erro no console.');
    });
}

function removeLogadoLink() {
    var linkLogado = document.getElementById('linkLogado');
    linkLogado.remove();
    var linkLogout = document.getElementById('linkLogout');
    linkLogout.remove();

}

function createLoginLink() {
    var login_html = "<a class=\"nav-link\" id=\"linkLogin\" href=\"#\" data-toggle=\"modal\" data-target=\"#myModal\" >Login</a>";
    login.innerHTML = login_html;
}

function removeLoginLink() {
    var linkLogin = document.getElementById('linkLogin');
    linkLogin.remove();
}

function blockPages() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user == null) {
            var page = location.href;
            if ((page.indexOf('Page1') != -1) || (page.indexOf('Page2') != -1) || (page.indexOf('Page3') != -1)) {
                $('#myModal').modal({ backdrop: 'static', keyboard: false, show: true });
            }
        }
    });
}







