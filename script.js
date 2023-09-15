
//Atribuindo váriaveis const
const input = document.querySelector("input");
const button = document.querySelector("button");

const local = document.querySelector("#local");
const local2 = document.querySelector("#local2");
const local3 = document.querySelector("#local3");
const local4 = document.querySelector("#local4");
const local5 = document.querySelector("#local5");
const local6 = document.querySelector("#local6");
const local7 = document.querySelector("#local7");
const content = document.querySelector(".content");


//Adcionando addEventListener que é um método que permite adicionar um ouvinte de eventos 
//a um elemento HTML, fazendo a API funcionar quando o botão (click) for acionado
button.addEventListener("click", () => {
    if (!input.value) return;  //Se for diferente do valor atual de um elemento HTML, volte

    getDataApi(); //data = todos os dados que usou
});


//Conectando a API do clima tempo, ao código 
//async = utilizado para indicar função assincrona, principalmente ao utilizar API's
//Váriavel já pega a variável e coloca dentro sem um getelementbyid
//EncodeURI = serve para já inserir o código dentro do link
//Enquanto o input.value, é para já pegar o valor dentro do input e o colocando dentro do link, ao invés de ser por ID

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=3020309eb14c260fd703ee602238b178`;


    //é usado para envolver código que pode lançar exceções catch associado. como if e else
    try {
        await fetch(url) //await indica que a execução do código será suspensa até que a promessa retornado por fetch seja resolvida url pega a api utilizada
            .then((res) => res.json()) //then resposta json 
            .then((data) => { //é respondido com a data que são todos os dados que foram colocados
                if (data?.cod && data.cod === "404") {
                    return alert("Local não encontrado"); //quando os dados colocados no input não forem encontrados
                }

                loadData(data);//load Data ligada a data que são todos os dados 
            });
    } catch(error) {//quando der erro aparecer o alert de erro
        alert(error);
    }
}

//Function para mostrar os dados na tela, coletados da API quando o botão for acionado
function loadData(data) {
    local.innerHTML = `${data.name}, ${data.sys.country}`;
    local2.innerHTML = `Tempetura: ${Math.floor(data.main.temp)} ºC`;
    local3.innerHTML = `Velocidade do vento: ${data.wind.speed} km/h`;
    local4.innerHTML= `Sensação térmica: ${data.main.feels_like}ºC`;
    local5.innerHTML= `Temperatura minima: ${data.main.temp_min}ºC`;
    local6.innerHTML= `Temperatura máxima: ${data.main.temp_max}ºC`;
    local7.innerHTML= `Umidade: ${data.main.humidity}%`;
    content.style.display = "flex"; 
}

//Apertar botão e ir para o globo terrestre
document.getElementById('meuBotao').addEventListener('click', function() {
    // URL que você deseja abrir quando o botão for clicado
    var link = 'https://earth.google.com/web/search/'+encodeURI(input.value);
    //O (input.value) funciona só porque tem apenas 1 input, se tivesse mais tinha que ser getelementbyid

    // Abre a URL em uma nova aba do navegador
    window.open(link);
});


