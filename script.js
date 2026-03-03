// script.js
// Array of background image filenames; put your actual image paths here
const backgrounds = [
    'Criatura cibernética em código verde.png',
    'eletronica.jpg',
    'bg3.jpg',
    'bg4.jpg',
    'Artificial.jpg',
    'bg6.jpg'
];

// initialize current index
let current = 0;

// a lista de arquivos CSS correspondentes -- cada botão troca para um estilo diferente
// você pode usar classes em vez de ficheiros e alterar o body.classList (veja abaixo)
const cssFiles = [
    'lógica.css',        // 0
    'eletro.css',   // 1
    'style-alt2.css',   // 2
    'style-alt3.css',   // 3
    'artificial.css',   // 4
    'style-alt5.css'    // 5
];

// Textos para cada página - EDITE AQUI o título e parágrafo de cada botão
const themeContent = {
    0: {
        title: "programming <br> logic",
        paragraph: "A logica e uma força implacavel, uma muralha de codigo construida para te cacar. <br> Seus algoritmos sao sentenças de morte; suas sequências, um caminho para a aniquilaçao total.Tente decifra-la... ou seja deletado."
    },
    1: {
        title: "electronics",
        paragraph: "Circuitos que pulsam com energia, máquinas que respiram código binário, sinais que atravessam o vazio. A eletrônica é o pulso do universo digital."
    },
    2: {
        title: "tema 3",
        paragraph: "Adicione o texto para o tema 3 aqui."
    },
    3: {
        title: "tema 4",
        paragraph: "Adicione o texto para o tema 4 aqui."
    },
    4: {
        title: "Cogito ergo sum",
        paragraph: "penso, logo existo."
    },
    5: {
        title: "tema 6",
        paragraph: "Adicione o texto para o tema 6 aqui."
    }
};

// cache elements
const scene = document.querySelector('.scene');
const buttons = document.querySelectorAll('.controls button');
const styleLink = document.getElementById('pagestyle');  // ver HTML atualizado abaixo

function updateBackground(index) {
    if (index < 0 || index >= backgrounds.length) return;

    // remove theme class do body atual antes de atualizar
    document.body.classList.remove(`theme-${current}`);

    current = index;

    // troca imagem de fundo
    scene.style.backgroundImage = `url('${backgrounds[current]}')`;

    // aplica classe de tema no body (para estilos dentro de um só CSS)
    document.body.classList.add(`theme-${current}`);

    // NOVO: Trocar o texto também
    const textElement = document.querySelector('.scene .overlay .text');
    if (textElement && themeContent[current]) {
        textElement.querySelector('h1').innerHTML = themeContent[current].title;
        textElement.querySelector('p').innerHTML = themeContent[current].paragraph;
    }

    // ou, se preferir trocar arquivo CSS em vez de usar classes:
    if (styleLink && cssFiles[current]) {
        styleLink.href = cssFiles[current];
    }

    // atualiza o botão ativo
    buttons.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.index, 10) === current);
    });
}

// attach event listeners
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        updateBackground(parseInt(btn.dataset.index, 10));
    });
});

// set initial
updateBackground(0);

// play/pause slideshow
const playBtn = document.querySelector('.play-button');
let playing = false;
let intervalId = null;

if (playBtn) {
  playBtn.addEventListener('click', () => {
    if (playing) {
      clearInterval(intervalId);
      playBtn.textContent = '▶';
    } else {
      intervalId = setInterval(() => {
        updateBackground((current + 1) % backgrounds.length);
      }, 3000);
      playBtn.textContent = '❚❚';
    }
    playing = !playing;
  });
}

// menu mobile toggle removido - menu agora é sidebar fixa

