let seuVotoPara = document.querySelector('.d-1--1 span');
let cargo = document.querySelector('.d-1--2 span');
let caracteres = document.querySelector('.d-1--3');
let descricaos = document.querySelector('.d-1--4');
let informacoes = document.querySelectorAll('.d-1--4 span b');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.right');

let etapaAtual = 0;
let voto = '';
let votoBranco = false;
let votos = [];

function começarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = '';
    voto = '';

    for(let i=0.5; i<etapa.numero; i++) {
        if(i === 0.5) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
        
    }
    
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    aviso.style.display = 'none';
    descricaos.innerHTML = '';
    lateral.innerHTML = '';
    caracteres.innerHTML = numeroHtml;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === voto) {
            return true;
        }else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricaos .innerHTML = `Nome: ${candidato.name}<br>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-img"><img src="img/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
        }

        lateral.innerHTML = fotosHtml;
    }else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricaos .innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }

}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        voto = `${voto}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }else {
            atualizaInterface();
        }
    }
}
function branco() {
    if(voto === '') {
        votoBranco = true;
        
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        caracteres.innerHTML = '';
        descricaos .innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para votar em BRANCO, não pode a ver nenhum número no campo. Clique em CORRIGIR para limpar o campo');
        
    }
}
function corrigir() {
    começarEtapa();
}
function confirmar() {
    let votoConfirmado = false;
    if(votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if(caracteres.length === etapas.numero) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: voto
        });
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            começarEtapa();
        } else {
            seuVotoPara.style.display = 'none';
            aviso.style.display = 'none';
            cargo.style.display = 'none'
            caracteres.innerHTML = '';
            descricaos .innerHTML = '<div class="aviso--grande pisca">FIM</div>';
            console.log(votos)
            
        }
    }
}


começarEtapa()