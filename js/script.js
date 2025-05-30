// Seleção de elementos do DOM
const multiplicationForm = document.querySelector("#multiplication-form"); // Formulário principal
const numberInput = document.querySelector("#number"); // Input do número base da tabuada
const multiplicationInput = document.querySelector("#multiplicator"); // Input do multiplicador máximo
const multiplicationTitle = document.querySelector("#multiplication-title span"); // Título dinâmico da tabuada
const multiplicationTable = document.querySelector("#multiplication-operations"); // Área onde a tabuada será exibida
const multiplicationSum = document.querySelector("#multiplication-sum");
const motivationalBtn = document.querySelector('#get-quote');
const motivationalQuote = document.querySelector('#motivational-quote'); // Área para exibir a frase motivacional
let frasesMotivacionais = []; // Array para armazenar as frases motivacionais

// Funções
/* Função para validar os valores de entrada - Garante que ambos são inteiros positivos */
const isValidInput = (number, multiplicatorNumber) => {
  return (
    Number.isInteger(number) &&
    number > 0 &&
    Number.isInteger(multiplicatorNumber) &&
    multiplicatorNumber > 0
  );
};

/*Função responsável por gerar e exibir a tabuada  Atualiza o título e a área de resultados */
const createTable = (number, multiplicatorNumber) => {
  multiplicationTable.innerHTML = "";
  let sum = 0 // Variável para armazenar a soma dos resultados

  if (!isValidInput(number, multiplicatorNumber)) {
    multiplicationTitle.textContent = "";
    multiplicationTable.innerHTML = "<p>Por favor, insira valores inteiros e positivos.</p>";
    if (multiplicationSum) multiplicationSum.textContent = "";
    return;
  }
  // Atualiza o título da tabuada
  multiplicationTitle.textContent = number;

  //criando a tabuada
  for (let i = 1; i <= multiplicatorNumber; i++) {
    const result = number * i;
    sum += result; // <-- Soma acumulada aqui
    const template = `
      <div class="row">
        <span>${number} x ${i} = </span>
        <span class="result">${result}</span>
      </div>
    `;
    multiplicationTable.innerHTML += template;
  }
  if (multiplicationSum) multiplicationSum.textContent = `Soma dos resultados: ${sum}`;
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

  // Retorna o foca ao primeiro campo
  numberInput.focus();
});

[numberInput, multiplicationInput].forEach((input) => {
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.target === numberInput) {
        multiplicationInput.focus(); // Vai para o próximo campo
      } else {
        multiplicationForm.dispatchEvent(new Event("submit")); // Faz a tabuada
      }
    }
  });
});

// Função para exibir uma frase motivacional aleatória
function mostrarFraseMotivacional() {
  if (frasesMotivacionais.length === 0) {
    motivationalQuote.textContent = "Carregando frases motivacionais...";
    return;
  }
  const index = Math.floor(Math.random() * frasesMotivacionais.length);
  motivationalQuote.textContent = frasesMotivacionais[index];
}

// Carrega as frases do arquivo JSON ao iniciar a página
fetch('frases.json')
.then(response => response.json())
.then(data => {
  frasesMotivacionais = data;
})
.catch(() => {
  frasesMotivacionais = [
    "Não foi possivel carregar as frases motivacionais. Tente novamente mais tarde. 😕"
  ];
});

motivationalBtn.addEventListener("click", mostrarFraseMotivacional);