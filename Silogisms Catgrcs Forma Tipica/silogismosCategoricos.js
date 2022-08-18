/*
 * @name Silogismo categórico de forma típica
 * @author Roberto Carlos dos Santos, Rio de Janeiro, Brasil
 * @description Baseado no capítulo 6 de Introdução à Lógica de Irving Copi.
  **** silogismosCategoricos.js   ****
 */

//Obtem as selecoes correspondentes à combinacao
//dada como entrada. A especificação foi informada
//no arquivo sketch.js

const PROPOSICAO = ['','A', 'E', 'I','O'];

class Bits{      
  constructor(bit1_, bit0_){  
    this.bit1=bit1_;
    this.bit0=bit0_;
  }
}

function converteProposicaoToBits(nrProposicao){  
  let bit1,bit0;
  let proposicao=PROPOSICAO[nrProposicao];
  //console.log('Proposicao: ',proposicao)
  if (proposicao==='A'){
     bit1=0;
     bit0=0;
  }
  if (proposicao==='E'){
     bit1=0;
     bit0=1;
  }
  if (proposicao==='I'){
     bit1=1;
     bit0=0;
  }
  if (proposicao==='O'){
     bit1=1;
     bit0=1;
  }  
  let retorno=new Bits(bit1,bit0);
  return retorno;
}

function getSelectedModes(idCombinacao){
  let retorno=new SelectedsModes();
  retorno.figura= ((idCombinacao + 3) & 3)+1;
  retorno.premMaior= (((idCombinacao + 15) & (3<<2))>>2)+1; 
  retorno.premMenor= (((idCombinacao + 63) & (3<<4))>>4)+1;
  retorno.conclusao= (((idCombinacao + 255) & (3<<6))>>6)+1;
  return retorno;  
}

function getIdCombinacao(selectdModes){
  let figura= selectdModes.figura-1;
  let premMaior=selectdModes.premMaior-1; 
  let premMenor=selectdModes.premMenor-1;
  let conclusao=selectdModes.conclusao-1;
  let retorno=(conclusao*64)+(premMenor*16)+
     (premMaior*4)+ figura+1;
  /*
  console.log('F ',selectdModes.figura)
  console.log('PM ',selectdModes.premMaior)
  console.log('pm ',selectdModes.premMenor)
  console.log('C ',selectdModes.conclusao)
  */
  return retorno;  
}
//Retorna true apenas se todas as regras foram validadas
//Ou seja, se todas retornaram true
function getValidadeSilogismo(idCombinacao){  
  retorno=true;
  let selectdModes=getSelectedModes(idCombinacao);
  //console.log(selectdModes);
  if (!validaRegra2(selectdModes)){
      retorno=false;
  }
  return retorno;
}
//Retorna true se não houve violação à regra 2
//Ou seja: se pelo menos um termo médio estiver 
//distribuído, na premissa maior ou na premissa 
//menor, a regra pode ser considerada validada (true)
//Do contrário, houve uma falácia (ou do termo Maior
// ou do termo menor)
function validaRegra2(selectdModes){  
  retorno=true;
  var TMedioPremMaiorDistrib=distribuiTMedioPremissaMaior(selectdModes);
  var TMedioPremMenorDistrib=distribuiTMedioPremissaMenor(selectdModes);
  strResultadoVerificaRegras='';
  //console.log(TMedioPremMaiorDistrib);
  if (TMedioPremMaiorDistrib===false &&
      TMedioPremMenorDistrib===false){
    
      strResultadoVerificaRegras+='Regra 2 violada:\nFalácia do Termo Médio não distribuído (nem o TM Maior, nem o TM Menor)!\n';                        
      retorno=false;
  }
  else{
      if(TMedioPremMaiorDistrib===false){
        strResultadoVerificaRegras+='obs.: TM da Prem. Maior não distribuído.\n'
      }
      if(TMedioPremMenorDistrib===false){
        strResultadoVerificaRegras+='obs.: TM da Prem. Menor não distribuído.\n'
      }
  }    
  return retorno;
}
function distribuiTMedioPremissaMaior(selectdModes){
  var retorno=false;
  if (selectdModes.figura===1 || selectdModes.figura===3){  
    // sujeito(termo médio) -> predicado 
    if (distribuiSujeito(selectdModes.premMaior)){
        retorno=true;
    }
  } else {
    // sujeito ->predicado(termo médio) 
    if (distribuiPredicado(selectdModes.premMaior)){
        retorno=true;
    }
  }  
  return retorno;
}
function distribuiTMedioPremissaMenor(selectdModes){
  var retorno=false;
  if (selectdModes.figura===3 || selectdModes.figura===4){  
    // sujeito(termo médio) -> predicado (S) 
    if (distribuiSujeito(selectdModes.premMenor)===true){        
        retorno=true;
    }
  } else {  //Figuras 1 e 2 do termo menor:
    // sujeito ->predicado(termo médio) 
    if (distribuiPredicado(selectdModes.premMenor)===true){
        retorno=true;
    }
  }  
  return retorno;
}
function distribuiSujeito(proposicao){
  var bits=converteProposicaoToBits(proposicao);
  console.log('PropSuj',PROPOSICAO[proposicao],bits.bit1, bits.bit1 !== 1)
  return (bits.bit1 !== 1);  
}
function distribuiPredicado(proposicao){
  let bits=converteProposicaoToBits(proposicao);
  console.log('PropPred',PROPOSICAO[proposicao],bits.bit0, bits.bit0 === 1)
  return (bits.bit0 === 1);  
}