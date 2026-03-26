// script.js
// Array of background image filenames; put your actual image paths here
const backgrounds = [
    'assets/images/Criatura cibernética em código verde.png',
    'assets/images/eletronica.jpg',
    'assets/images/Banco.jpg',
    'assets/videos/language.mp4', 
    'assets/images/Artificial.png',
    'bg6.jpg'
];

// Vídeos alternativos que tocam durante a reprodução do áudio (para fundo 4, usa language_voice_video.mp4)
const alternativeVideos = {
    3: 'assets/videos/language_voice_video.mp4'  // fundo 4 (índice 3) tem um vídeo alternativo
};

const audios = [
    'assets/audio/logica_voice.mp3',
    'assets/audio/eletro_voice.mp3',
    'assets/audio/Banco_voice.mp3',
    'assets/audio/languages_voice.mp3',  // Adicione um arquivo de áudio para o background
    'assets/audio/artificial_voice.mp3',
    
];

// initialize current index
let current = 0;

// a lista de arquivos CSS correspondentes -- cada botão troca para um estilo diferente
// você pode usar classes em vez de ficheiros e alterar o body.classList (veja abaixo)
const cssFiles = [
    'css/lógica.css',        // 0
    'css/eletro.css',   // 1
    'css/banco.css',   // 2
    'css/languages.css',   // 3
    'css/artificial.css',   // 4
    
];

// Textos para cada página - EDITE AQUI o título e parágrafo de cada botão
const themeContent = {
    0: {
        title: "programming <br> logic",
        paragraph: "A lógica e uma força implacável, uma muralha de código construida para te caçar. <br> Seus algoritmos são sentenças de morte; suas sequências, um caminho para a aniquilação total. Tente decifrá-la... ou seja DELETADO."
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
        title: "Languages",
        paragraph: "Adicione o texto para o tema 4 aqui."
    },
    4: {
        title: "Cogito ergo sum",
        paragraph: "penso, logo existo."
    },
    
};

// cache elements
const scene = document.querySelector('.scene');
const buttons = document.querySelectorAll('.controls button');
const styleLink = document.getElementById('pagestyle');  // ver HTML atualizado abaixo
const playAudioBtn = document.querySelector('.play-button');
const backgroundVideo = document.getElementById('background-video');
// try to grab an existing audio element; if it doesn't exist create one so code doesn't break
let audioElement = document.getElementById('background-audio');
if (!audioElement) {
    console.warn('Nenhum elemento <audio> encontrado, criando dinamicamente.');
    audioElement = document.createElement('audio');
    audioElement.id = 'background-audio';
    document.body.appendChild(audioElement);
}
let playing = false;

console.log('playAudioBtn encontrado:', playAudioBtn);
console.log('audioElement encontrado:', audioElement);

function isVideoFile(filename) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

function updateBackground(index) {
    if (index < 0 || index >= backgrounds.length) return;

    // remove theme class do body atual antes de atualizar
    document.body.classList.remove(`theme-${current}`);

    current = index;

    const backgroundFile = backgrounds[current];

    // verifica se é um vídeo ou imagem
    if (isVideoFile(backgroundFile)) {
        // para vídeo: exibir elemento de vídeo
        backgroundVideo.src = backgroundFile;
        backgroundVideo.style.display = 'block';
        scene.style.backgroundImage = 'none';
    } else {
        // para imagem: usar backgroundImage como antes
        scene.style.backgroundImage = `url('${backgroundFile}')`;
        backgroundVideo.style.display = 'none';
    }

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

    // If audio is playing, switch to the new audio
    if (playing) {
        const newAudioSrc = audios[current];
        console.log('Mudando para novo áudio:', newAudioSrc);
        audioElement.src = newAudioSrc;
        audioElement.play().then(() => {
            console.log('Novo áudio começou a tocar');
        }).catch(error => {
            console.error('Erro ao tocar novo áudio:', error);
        });
    }
}

// attach event listeners
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        updateBackground(parseInt(btn.dataset.index, 10));
    });
});

// set initial
updateBackground(0);

// play/pause audio for current background
if (playAudioBtn) {
  playAudioBtn.addEventListener('click', () => {
    console.log('Botão play clicado, current:', current, 'playing:', playing);
    if (playing) {
      audioElement.pause();
      playAudioBtn.textContent = '▶';
      console.log('Áudio pausado');
      
      // Se voltou para o fundo 4, restaurar vídeo original
      if (current === 3 && alternativeVideos[3]) {
        backgroundVideo.src = backgrounds[3];
        backgroundVideo.classList.remove('playing-alt-video');
        console.log('Voltando para o vídeo original do fundo 4');
      }
    } else {
      const audioSrc = audios[current];
      console.log('Tentando tocar áudio:', audioSrc);
      audioElement.src = audioSrc;
      
      // Se está tocando áudio do fundo 4 e tem vídeo alternativo, trocar
      if (current === 3 && alternativeVideos[3]) {
        backgroundVideo.src = alternativeVideos[3];
        backgroundVideo.classList.add('playing-alt-video');
        console.log('Trocando para vídeo alternativo:', alternativeVideos[3]);
        
        // Quando o áudio terminar, voltar para o vídeo original
        audioElement.onended = () => {
          if (current === 3) {
            backgroundVideo.src = backgrounds[3];
            backgroundVideo.classList.remove('playing-alt-video');
            console.log('Áudio terminou, voltando para vídeo original do fundo 4');
          }
          playing = false;
          playAudioBtn.textContent = '▶';
        };
      }
      
      audioElement.play().then(() => {
        console.log('Áudio começou a tocar');
      }).catch(error => {
        console.error('Erro ao tocar áudio:', error);
      });
      playAudioBtn.textContent = '❚❚';
    }
    playing = !playing;
  });
}

// Topbar toggle - main button + return button
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.topbar-toggle');
    const topbar = document.querySelector('.topbar');
    toggle.addEventListener('click', () => topbar.classList.toggle('hidden'));
});

