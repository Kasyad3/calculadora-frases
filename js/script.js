// Seleção de elementos do DOM
const multiplicationForm = document.querySelector("#multiplication-form"); // Formulário principal
const numberInput = document.querySelector("#number"); // Input do número base da tabuada
const multiplicationInput = document.querySelector("#multiplicator"); // Input do multiplicador máximo
const multiplicationTitle = document.querySelector("#multiplication-title span"); // Título dinâmico da tabuada
const multiplicationTable = document.querySelector("#multiplication-operations"); // Área onde a tabuada será exibida

const motivationalBtn = document.querySelector("#get-quote");
const motivationalQuote = document.querySelector("#motivational-quote");
let frasesMotivacionais = [];
// Funções
/* Função para validar os valores de entrada - Garante que ambos são inteiros positivos */
const isValidInput = (number, multiplicatorNumber) => {
  return (
    Number.isInteger(number) &&
    Number.isInteger(multiplicatorNumber) &&
    number > 0 &&
    multiplicatorNumber > 0
  );
};
 
/*Função responsável por gerar e exibir a tabuada  Atualiza o título e a área de resultados */
const createTable = (number, multiplicatorNumber) => {
  multiplicationTable.innerHTML = "";
 
  if (!isValidInput(number, multiplicatorNumber)) {
    multiplicationTitle.textContent = "";
    multiplicationTable.innerHTML = "<p>Por favor, insira valores inteiros e positivos.</p>";
    return;
  }
  // Atualiza o título da tabuada
  multiplicationTitle.textContent = number;
 
  //criando a tabuada
  for (let i = 1; i <= multiplicatorNumber; i++) {
    const result = number * i;
    const template = `
      <div class="row">
        <span>${number} x ${i} = </span>
        <span class="result">${result}</span>
      </div>
    `;
    multiplicationTable.innerHTML += template;
  }
};
 
// Eventos
multiplicationForm.addEventListener("submit", (e) => {
  e.preventDefault();
 
  // Converte valores dos inputs para inteiros
  const number = parseInt(numberInput.value, 10);
  const multiplicatorNumber = parseInt(multiplicationInput.value, 10);
 
  // Gera a tabuada
  createTable(number, multiplicatorNumber);
 
  // Limpa os campos para nova entrada
  numberInput.value = "";
  multiplicationInput.value = "";
 
  // Retorna o foco ao primeiro campo
  numberInput.focus();
});
 
// Permite gerar a tabuada ao pressionar Enter em qualquer campo do formulário
[numberInput, multiplicationInput].forEach((input) => {
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      multiplicationForm.dispatchEvent(new Event("submit"));
    }
  });
});

//Função para exibir frase aleatória
function mostrarFraseMotivacional(){
    if(frasesMotivacionais.lenght ===0){
        motivationalQuote.textContent = "Carregando frases motivacionais..."
        return;
    }
    const index = Math.floor(Math.random() * frasesMotivacionais.lenght);
    motivationalQuote.textContent = frasesMotivacionais[index];
}

//Carrega as frases do arquivo json ao iniciar a página
fetch('frases.json')
.then(response => response.json())
.then(data => {
    frasesMotivacionais = data;
})
.catch(() => {
    frasesMotivacionais = ["Não foi possível carregar as frases motivacionais. Tente novamente mais tarde. 😕"];

});

//Evento do botão
motivationalBtn.addEventListener("click", mostrarFraseMotivacional);