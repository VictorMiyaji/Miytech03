// ============================
// ELEMENTOS DOM
// ============================

const videoDescricao = document.getElementById("videoDescricao");
const tituloDescricao = document.getElementById("tituloDescricao");
const textoDescricao = document.getElementById("textoDescricao");
const containerDescricao = document.getElementById("containerDescricao");
const trackServicos = document.getElementById("trackServicos");
const boxServicos = document.querySelectorAll(".boxServicos");
const caixote = document.querySelectorAll(".caixote");

const setaEsquerda = document.querySelector(".angleLeft");
const setaDireita = document.querySelector(".angleRight");
const setaEsquerdaDescricao = document.querySelector(".setaEsquerdaDescricao");
const setaDireitaDescricao = document.querySelector(".setaDireitaDescricao");

const fecharDescricao = document.getElementById("fecharDescricao");
const viewport = document.getElementById("viewportServicos");
const iconeDasTelasDesktop = document.querySelectorAll(".iconeDasTelasDesktop");
const areaIcone = document.querySelectorAll(".areaIcone");

// ============================
// VARIÁVEIS DE ESTADO
// ============================

let indice = 0;
let startX = 0;
let movedX = 0;
let isDragging = false;
let descricaoAberta = false;
let intervalo = iniciarIntervalo();
const totalItems = trackServicos.children.length;

// ============================
// DADOS DAS DESCRIÇÕES
// ============================

const conteudoDescricao = [
  {
    titulo: "Projeto elétrico e eletrônico",
    descricao: `• Projetos elétricos para controle e supervisão de máquinas;\n
    • Contemplamos as normas brasileiras.\n• Projetos elétricos elaborados em EPLAN.\n
    • Projetos eletrônicos elaborados em Proteus.\n• Circuitos com tecnologia RISC, ASIC, CMOS, TTL e HCMOS.\n
    • Layout com componentes DIP ou SMD.\n• Nacionalização de placas importadas.\n
    • Projeto e controle com circuitos dedicados para máquinas OEM.`,
    video: "videos/5846456-hd_1080_1920_25fps.mp4",
  },
  {
    titulo: "Software para CLP, IHM, supervisório e rastreabilidade",
    descricao: `• Malhas acima de 10.000 pontos.\n
    • Linguagens de programação IL, STL, ST, FB, Ladder e Grafcet.\n
    • Sistemas de controle tipo PID, Fuzzy Logic ou Fuzzy Neural.\n
    • Desenvolvimento de software para PLC, IHM e robô com as principais marcas do mercado como Rockwell, Siemens, Schneider, Omron, Fanuc, Kuka, Epson, Wago, Delta, Rexroth, Keyence e outros.\n
    • Documentações padronizadas.\n
    • Supervisão de máquinas, produção e outros.\n
    • Rastreabilidade de peças produzidas.\n
    • Armazenamento com banco de dados SQL, Oracle, dBase e Cloud.\n
    • Desenvolvimento em software supervisório, LabVIEW, C/C++, C#, .NET, Java e Python.\n
    • Sistema operacional Windows, Windows Server, Linux ou embarcado.`,
    video: "videos/5925286-uhd_2160_3840_24fps.mp4",
  },
  {
    titulo: "Hardware dedicado de supervisão",
    descricao: `• Projetos elétricos para controle e supervisão de máquinas.\n
    • Contemplamos as normas brasileiras.\n
    • Projetos elétricos elaborados em EPLAN.\n
    • Projetos eletrônicos elaborados em Proteus.\n
    • Circuitos com tecnologia RISC, ASIC, CMOS, TTL e HCMOS.\n
    • Layout com componentes DIP ou SMD.\n
    • Nacionalização de placas importadas.\n
    • Projeto e controle com circuitos dedicados para máquinas OEM.`,
    video: "videos/6755168-hd_1080_1920_25fps.mp4",
  },
  {
    titulo: "Retrofitting de máquinas industriais",
    descricao: `• Reforma total de máquinas no sistema de controle e acionamento.\n
    • Otimização de processo e controle de máquinas para aumento de produtividade.\n
    • Inclusão de sistema para manutenção remota e preventiva nas máquinas.`,
    video: "videos/13032235_1080_1920_25fps.mp4",
  },
  {
    titulo: "Manutenção eletroeletrônica",
    descricao: `• Realizamos visitas de manutenção preventiva e corretiva em serviços de hardware e software.\n
    • Assistências remotas procurando auxiliar o pessoal da manutenção nos eventos diários e emergenciais.\n
    • Equipe especializada pronta a atender, reduzir e solucionar os problemas de manutenção.`,
    video: "videos/6755162-hd_1080_1920_25fps.mp4",
  },
  {
    titulo: "Desenvolvimento de máquinas industriais especiais",
    descricao: `• Desenvolvemos projetos e equipamentos para operações específicas com o objetivo de atender às necessidades de cada processo produtivo.\n
    • Realizamos a montagem elétrica e mecânica, instalação com hardware e sistemas integrados.\n
    • Efetuamos as orientações necessárias aos funcionários que irão operar a máquina.`,
    video: "videos/7660185-uhd_2160_3840_25fps.mp4",
  },
];

// ============================
// FUNÇÕES DE UTILIDADE
// ============================

function getItensVisiveis() {
  return window.innerWidth <= 768 || descricaoAberta ? 1 : 3;
}

function tamanhoRealdoBoxServicos() {
  return boxServicos[0].getBoundingClientRect().width;
}

function atualizarDescricao(index) {
  const servico = conteudoDescricao[index];
  tituloDescricao.textContent = servico.titulo;

  const paragrafos = servico.descricao
    .split("\n")
    .map((linha) => `<p>${linha.trim()}</p>`)
    .join("");

  textoDescricao.innerHTML = paragrafos;
  videoDescricao.src = servico.video;

  atualizarIcones();
}

function atualizarFlexBoxes() {
  const largura = window.innerWidth;
  boxServicos.forEach((box) => {
    box.style.flex =
      largura <= 768 || descricaoAberta ? "0 0 100%" : "0 0 calc(100% / 3)";
  });
}

function deixaPretoViewport() {
  const largura = window.innerWidth;

  if (largura < 768) {
    viewport.style.background = descricaoAberta
      ? "rgba(10, 25, 45, 0.7)"
      : "black";
    viewport.style.boxShadow = "none";
  } else {
    viewport.style.background = "black";
    viewport.style.boxShadow = descricaoAberta
      ? "inset 0 8px 6px -4px rgba(255, 255, 255, 0.12), inset 8px 0 6px -4px rgba(255, 255, 255, 0.12), inset -8px 0 6px -4px rgba(255, 255, 255, 0.12)"
      : "none";
  }
}

function atualizarIcones() {
  areaIcone.forEach((icone, i) => {
    icone.classList.toggle("iconeAtivo", i === indice);
  });
}

function iniciarIntervalo() {
  return setInterval(() => {
    const maxIndice = boxServicos.length - getItensVisiveis();
    indice = indice < maxIndice ? indice + 1 : 0;
    carrossel();
    atualizarDescricao(indice);
  }, 10000);
}

function pausarIntervalo() {
  clearInterval(intervalo);
  intervalo = null;
}

function retomarIntervalo() {
  if (!intervalo) intervalo = iniciarIntervalo();
}

// ============================
// FUNÇÃO PRINCIPAL DO CARROSSEL
// ============================

function carrossel() {
  const larguraBox = tamanhoRealdoBoxServicos();
  const itensVisiveis = getItensVisiveis();
  const maxIndice = boxServicos.length - itensVisiveis;

  indice = Math.max(0, Math.min(indice, maxIndice));
  trackServicos.style.transform = `translateX(-${larguraBox * indice}px)`;

  const opacidadeSeta = (cond) => (cond ? "0.3" : "1");
  const pointerSeta = (cond) => (cond ? "none" : "auto");

  [setaEsquerda, setaEsquerdaDescricao].forEach((seta) => {
    seta.style.opacity = opacidadeSeta(indice === 0);
    seta.style.pointerEvents = pointerSeta(indice === 0);
  });

  [setaDireita, setaDireitaDescricao].forEach((seta) => {
    seta.style.opacity = opacidadeSeta(indice >= maxIndice);
    seta.style.pointerEvents = pointerSeta(indice >= maxIndice);
  });
}

// ============================
// EVENTOS DE TOQUE (SWIPE)
// ============================

trackServicos.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

trackServicos.addEventListener("touchmove", (e) => {
  if (isDragging) movedX = e.touches[0].clientX - startX;
});

trackServicos.addEventListener("touchend", () => {
  if (!isDragging) return;

  const threshold = window.innerWidth * 0.01;
  const maxIndice = boxServicos.length - getItensVisiveis();

  if (movedX < -threshold && indice < maxIndice) indice++;
  else if (movedX > threshold && indice > 0) indice--;

  carrossel();
  atualizarDescricao(indice);

  isDragging = false;
  movedX = 0;
});

// ============================
// EVENTOS DE SETAS
// ============================

const moverIndice = (delta) => {
  indice =
    (indice + delta + conteudoDescricao.length) % conteudoDescricao.length;
  carrossel();
  atualizarDescricao(indice);
};

setaEsquerda.addEventListener("click", () => moverIndice(-1));
setaDireita.addEventListener("click", () => moverIndice(1));
setaEsquerdaDescricao.addEventListener("click", () => moverIndice(-1));
setaDireitaDescricao.addEventListener("click", () => moverIndice(1));

// ============================
// EVENTOS DE MOUSE PARA PAUSAR/RETOMAR CARROSSEL
// ============================

[trackServicos, containerDescricao].forEach((el) => {
  el.addEventListener("mouseenter", pausarIntervalo);
  el.addEventListener("mouseleave", retomarIntervalo);
});

// ============================
// ABRIR DESCRIÇÃO AO CLICAR EM BOX
// ============================

caixote.forEach((box, index) => {
  box.addEventListener("click", () => {
    indice = index;
    descricaoAberta = true;

    atualizarDescricao(indice);
    containerDescricao.style.display = "flex";

    caixote.forEach((item) => {
      const botao = item.querySelector(".botaoSaibaMais");
      const frase = item.querySelector(".fraseServicos");
      if (botao) botao.style.display = "none";
      if (frase) frase.style.display = "none";
    });

    deixaPretoViewport();
    atualizarFlexBoxes();
    carrossel();
  });
});

// ============================
// FECHAR DESCRIÇÃO
// ============================

fecharDescricao.addEventListener("click", () => {
  containerDescricao.style.display = "none";
  descricaoAberta = false;

  caixote.forEach((item) => {
    const botao = item.querySelector(".botaoSaibaMais");
    const frase = item.querySelector(".fraseServicos");
    if (botao) botao.style.display = "block";
    if (frase) frase.style.display = "block";
  });

  deixaPretoViewport();
  atualizarFlexBoxes();
  carrossel();
});

// ============================
// EVENTOS DE RESIZE E LOAD
// ============================

window.addEventListener("load", () => {
  if (window.innerWidth >= 1024 && !descricaoAberta) {
    descricaoAberta = true;
    containerDescricao.style.display = "flex";
    atualizarDescricao(indice);
    atualizarFlexBoxes();
    carrossel();

    caixote.forEach((item) => {
      const botao = item.querySelector(".botaoSaibaMais");
      const frase = item.querySelector(".fraseServicos");
      if (botao) botao.style.display = "none";
      if (frase) frase.style.display = "none";
    });
  }
});

window.addEventListener("resize", () => {
  const maxIndice = boxServicos.length - getItensVisiveis();
  if (indice > maxIndice) indice = maxIndice;

  if (window.innerWidth >= 1024 && !descricaoAberta) {
    descricaoAberta = true;
    containerDescricao.style.display = "flex";
    atualizarDescricao(indice);

    caixote.forEach((item) => {
      const botao = item.querySelector(".botaoSaibaMais");
      const frase = item.querySelector(".fraseServicos");
      if (botao) botao.style.display = "none";
      if (frase) frase.style.display = "none";
    });
  }

  atualizarFlexBoxes();
  carrossel();
});

window.addEventListener("resize", () => {
  const video = document.querySelector("header video");
  if (video) {
    video.style.display = "none";
    void video.offsetHeight;
    video.style.display = "block";
  }
});

// ============================
// CLIQUE NOS ÍCONES DESKTOP
// ============================

iconeDasTelasDesktop.forEach((icone) => {
  icone.addEventListener("click", () => {
    const novoIndice = parseInt(icone.getAttribute("data-indice"));
    indice = novoIndice;
    descricaoAberta = true;

    atualizarDescricao(indice);
    atualizarFlexBoxes();
    carrossel();
    atualizarIcones();
  });
});
