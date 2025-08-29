document.getElementById('iniciar-quiz').addEventListener('click', function() {
    iniciarQuiz();
});


function scrollToQuiz() {
    const quizSection = document.getElementById('quiz');
    quizSection.scrollIntoView({ behavior: 'smooth' });
}


document.querySelectorAll('a[href="#quiz"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToQuiz();
        
   
        setTimeout(() => {
            document.getElementById('iniciar-quiz').click();
        }, 800);
    });
});


const perguntas = [
    {
        pergunta: "What does 'book' mean in Portuguese?",
        opcoes: ["Livro", "Caderno", "Bolsa", "Mochila"],
        resposta: 0
    },
    {
        pergunta: "How do you say 'obrigado' in English?",
        opcoes: ["Please", "Thank you", "Sorry", "Hello"],
        resposta: 1
    },
    {
        pergunta: "Which sentence is correct?",
        opcoes: [
            "I am going to the school",
            "I going to the school",
            "I am go to the school",
            "I goes to the school"
        ],
        resposta: 0
    },
    {
        pergunta: "What is the past tense of 'eat'?",
        opcoes: ["Eated", "Ate", "Eaten", "Eating"],
        resposta: 1
    },
    {
        pergunta: "Choose the correct translation: 'Eu gosto de maçãs'",
        opcoes: [
            "I like apples",
            "I likes apples",
            "I liked apples",
            "I will like apples"
        ],
        resposta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;


const iniciarQuizBtn = document.getElementById('iniciar-quiz');
const proximaPerguntaBtn = document.getElementById('proxima-pergunta');
const reiniciarQuizBtn = document.getElementById('reiniciar-quiz');
const perguntaTexto = document.getElementById('pergunta-texto');
const opcoesContainer = document.getElementById('opcoes');
const quizContent = document.getElementById('quiz-content');
const resultadoContent = document.getElementById('resultado');
const pontuacaoElement = document.getElementById('pontuacao');
const totalPerguntasElement = document.getElementById('total-perguntas');
const mensagemResultado = document.getElementById('mensagem-resultado');


iniciarQuizBtn.addEventListener('click', () => {
    iniciarQuizBtn.style.display = 'none';
    proximaPerguntaBtn.style.display = 'inline-block';
    carregarPergunta();
});


proximaPerguntaBtn.addEventListener('click', () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
});


reiniciarQuizBtn.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    resultadoContent.style.display = 'none';
    quizContent.style.display = 'block';
    iniciarQuizBtn.style.display = 'inline-block';
    proximaPerguntaBtn.style.display = 'none';
});


function carregarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    perguntaTexto.textContent = pergunta.pergunta;
    
    opcoesContainer.innerHTML = '';
    
    pergunta.opcoes.forEach((opcao, index) => {
        const botaoOpcao = document.createElement('div');
        botaoOpcao.classList.add('quiz-option');
        botaoOpcao.textContent = opcao;
        botaoOpcao.addEventListener('click', () => verificarResposta(index));
        opcoesContainer.appendChild(botaoOpcao);
    });
    
    if (perguntaAtual === perguntas.length - 1) {
        proximaPerguntaBtn.textContent = 'Finalizar';
    }
}

function verificarResposta(opcaoIndex) {
    const pergunta = perguntas[perguntaAtual];
    const opcoes = opcoesContainer.querySelectorAll('.quiz-option');
    

    opcoes.forEach(opcao => {
        opcao.style.pointerEvents = 'none';
    });
    
    if (opcaoIndex === pergunta.resposta) {
        opcoes[opcaoIndex].style.backgroundColor = '#d4edda';
        pontuacao++;
    } else {
        opcoes[opcaoIndex].style.backgroundColor = '#f8d7da';
        opcoes[pergunta.resposta].style.backgroundColor = '#d4edda';
    }
    
    proximaPerguntaBtn.disabled = false;
}


function mostrarResultado() {
    quizContent.style.display = 'none';
    resultadoContent.style.display = 'block';
    pontuacaoElement.textContent = pontuacao;
    totalPerguntasElement.textContent = perguntas.length;
    
    if (pontuacao === perguntas.length) {
        mensagemResultado.textContent = 'Parabéns! Você acertou todas as questões!';
    } else if (pontuacao >= perguntas.length * 0.7) {
        mensagemResultado.textContent = 'Muito bom! Seu inglês está indo bem!';
    } else if (pontuacao >= perguntas.length * 0.5) {
        mensagemResultado.textContent = 'Bom trabalho! Continue praticando!';
    } else {
        mensagemResultado.textContent = 'Continue estudando, você vai melhorar!';
    }
}


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});


window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
});