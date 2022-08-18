/*
 * @name Silogismo categórico de forma típica
 * @author Roberto Carlos dos Santos, Rio de Janeiro, Brasil
 * @description Baseado no capítulo 6 de Introdução à Lógica de Irving Copi.
      ***  sketch.js  ***
 */
let txtSujeito, lblSujeito;
let txtPredicado, lblPredicado;
let txtTermoMedio,lblTermoMedio;
let radioFigura,radioPremMaior,radioPremMenor,radioConclusao, radioModoManual;
let lblFigura, lblFigura1,lblFigura2,lblFigura3, lblSlider;
let lblPremMaior, lblPremMenor,lblConclusao;
let txtPremMaior, txtPremMenor,txtConclusao;
let lblResultado, lblResultado1;
let titulo, nrCombinacao;
let bt;
let pg;
let strResultadoVerificaRegras;
class Afixs {
  constructor(prefix_, term1_, middle_,term2_) {
    this.prefix = prefix_;
    this.term1 = term1_;
    this.middle = middle_;    
    this.term2 = term2_;
  }
}

class SelectedsModes {
  constructor(figura_, premMaior_, premMenor_,conclusao_) {
    this.figura = figura_;
    this.premMaior = premMaior_;
    this.premMenor = premMenor_;    
    this.conclusao = conclusao_;
  }
}

function setup() {
      
  pg = createGraphics(50, 50);

  titulo = createElement('H1', 'Silogismo categórico de forma típica');
  titulo.position(30,-25)
  titulo.style('color','blue');
  titulo.style('font-size','2.2rem');
  // create canvas
  let canvas1=createCanvas(700, 680);        
     
  //txtSujeito
  lblSujeito = createElement('H2', 'Digite o sujeito');
  lblSujeito.position(30, 14);
  txtSujeito = createInput('Ser humano');
  txtSujeito.position(30, 60);
  txtSujeito.size(400)
  txtSujeito.input(hndTxtSujeito)
  //txtPredicado
  lblPredicado = createElement('H2', 'Digite o predicado');
  lblPredicado.position(30, 64);
  txtPredicado = createInput('Estudante');
  txtPredicado.position(30, 114);
  txtPredicado.size(400)
  txtPredicado.input(hndTxtPredicado)
  //txtTermoMedio
  lblTermoMedio = createElement('H2', 'Digite o termo médio');
  lblTermoMedio.position(30, 124);
  txtTermoMedio = createInput('Ser capaz de pensar');
  txtTermoMedio.position(30, 174);
  txtTermoMedio.size(400)
  txtTermoMedio.input(hndTxtTermoMedio)
  //
  /*
  lblModoManual = createElement('H4', 'Modo (manual ou combinação)?');
  lblModoManual.position(460,70)
  radioModoManual = createRadio('ModoManual');
  radioModoManual.position(480, 120);    
  radioModoManual.option('Manual',1);
  radioModoManual.option('Combinação',2);
  radioModoManual.style('height', '50px');
  radioModoManual.selected('1');  
  */
  //
  lblFigura = createElement('H3', 'Figura típica:');
  lblFigura.position(430, 260);
  radioFigura = createRadio('Figura');
  radioFigura.position(430, 300);
  lblFigura1 = createElement('p','TM-P');
  lblFigura1.position(440, 310);
  lblFigura2 = createElement('p', 'S-TM');
  lblFigura2.position(440, 330);
  lblFigura3 = createElement('p', 'S-P');
  lblFigura3.position(440, 350);
  
  radioFigura.option(1,'1');
  radioFigura.option(2,'2');
  radioFigura.option(3,'3');
  radioFigura.option(4,'4');
  radioFigura.style('height', '50px');
  radioFigura.selected('1');
  radioFigura.input(hndRadioFigura);
  //
  lblPremMaior = createElement('H3', 'Premissa maior:');
  lblPremMaior.position(30, 190);
  radioPremMaior = createRadio('PremMaior');
  radioPremMaior.position(25, 230);
  radioPremMaior.option('A',1);
  radioPremMaior.option('E',2);
  radioPremMaior.option('I',3);
  radioPremMaior.option('O',4);
  radioPremMaior.style('height', '50px');
  radioPremMaior.style('checked','0');
  radioPremMaior.selected('1'); 
  radioPremMaior.input(hndRadioPremMaior);
  txtPremMaior = createElement('p', montaPremMaior());
  txtPremMaior.position(30, 240);  
  //
  lblPremMenor = createElement('H3', 'Premissa menor:');
  lblPremMenor.position(30, 260);
  radioPremMenor = createRadio('PremMenor');
  radioPremMenor.position(25, 300);
  radioPremMenor.option('A',1);
  radioPremMenor.option('E',2);
  radioPremMenor.option('I',3);
  radioPremMenor.option('O',4);
  radioPremMenor.style('height', '50px');
  radioPremMenor.selected('1'); 
  radioPremMenor.input(hndRadioPremMenor);
  txtPremMenor = createElement('p', montaPremMenor());
  txtPremMenor.position(30, 305);  
  //
  lblConclusao = createElement('H3', 'Conclusão:');
  lblConclusao.position(30, 325);
  radioConclusao = createRadio('Conclusao');
  radioConclusao.position(25, 365);
  radioConclusao.option('A',1);
  radioConclusao.option('E',2);
  radioConclusao.option('I',3);
  radioConclusao.option('O',4);
  radioConclusao.style('checked','0');
  radioConclusao.style('height', '50px');
  radioConclusao.selected('1'); 
  radioConclusao.input(hndRadioConclusao);
  txtConclusao = createElement('p', montaConclusao());
  txtConclusao.position(30, 370);
  //
  lblSlider = createElement('H5', 'Combinações de figura e modo (256 no total):');
  lblSlider.position(420,190)
  
  slider = createSlider(1, 256, 1, 1);
  slider.position(420, 230);
  slider.style('width', '250px');
  slider.value('1')
  slider.input(setSlider)
  nrCombinacao=createElement('h2', '1');
  nrCombinacao.position(540, 225); 
  nrCombinacao.input(setNrCombinacao)  
  //
  lblResultado=createElement('H2','Resultado');
  lblResultado.position(30,410);
  lblResultado1=createElement('H3','Silogismo válido!');
  lblResultado1.position(30,440);
  lblResultado1.size(250);  
  
  //
  bt=createButton('Testes');
  bt.position(10,650);
  bt.mousePressed(btClicked);

}
//Apenas para debug:
function btClicked(){
   let nrCombinacao1=slider.value();
   //console.log(nrCombinacao1)
   let selectdModes=getSelectedModes(nrCombinacao1);
   /*
   console.log('F ',selectdModes.figura)
   console.log('PM ',selectdModes.premMaior)
   console.log('pm ',selectdModes.premMenor)
   console.log('C ',selectdModes.conclusao)
   */
   let result=getIdCombinacao(selectdModes);
   //console.log(result);
}

function setSlider(){
  let numAtualCombinacao=slider.value();
  nrCombinacao.html(numAtualCombinacao);
  setNrCombinacao();
  hndRadioFigura();
  //console.log(numAtualCombinacao)
  //console.log(radioFigura)
  //return false;
}

function setNrCombinacao(){
  //As manipulações de bits são destinadas a manter a combinação 
  //(combinação de 256 variações de modos e figuras)
  // variando de 1 a 4 para as seleções do radio button
  // 1 a 256 decimal foi dividido em 4 partes de dois bits cada modo.
  // Cada par de bits representa a seleção de um conjunto de radio buttons
  // Assim:  11 11 11 11 (onde o primeiro par da direita para a esquerda
  // representa o conjunto de radio button da Figura típica, o segundo par 
  // representa os radiobuttons da Premissa Maior e assim por diante)
  const figura=((slider.value())+3 & 3)+1;   //3 em binário: 11
  radioFigura.value(str(figura)) //.checked="true";
  const premMaior=((slider.value()+15 & (3<<2))>>2)+1;  //15 binário: 1111
  radioPremMaior.value(str(premMaior))  //.checked="true";
  const premMenor=((slider.value()+63 & (3<<4))>>4)+1; //63 bin: 111111
  radioPremMenor.value(str(premMenor))  //.checked="true";
  const conclusao=((slider.value()+255 & (3<<6))>>6)+1; //255 bin: 11111111
  radioConclusao.value(str(conclusao))  //.checked="true";
  montaPremissasEConclusao();
  //console.log('|'+str(premMaior)+'|')  
}

function getAfix(figura, modo, termo1, termo2, tipoTermo){
  let retorno=new Afixs();
  if (modo==='1'){
     retorno.prefix='Todo(a)(s) '
     retorno.middle=' é (são) '
  }
  if (modo==='2'){
      retorno.prefix='Nenhum(a) '
      retorno.middle=' é (são) '
  }
  if (modo==='3'){
      retorno.prefix='Algum(a)(s) '
      retorno.middle=' é (são) '
  }
  if (modo==='4'){
      retorno.prefix='Algum(a)(s) '
      retorno.middle=' não é (são) '
  }
  if ( ((figura==='1' || figura==='3') && tipoTermo===1) || 
       ((figura==='3' || figura==='4') && tipoTermo===2) || tipoTermo===3 ) 
  {      
     retorno.term1=termo1
     retorno.term2=termo2
  } else{        
     retorno.term1=termo2
     retorno.term2=termo1
  }
  //console.log(retorno);
  return retorno;
}
function montaPremissasEConclusao(){
  txtPremMaior.html(montaPremMaior())
  txtPremMenor.html(montaPremMenor())
  txtConclusao.html(montaConclusao())
  let idCombinacao=slider.value();
  if (getValidadeSilogismo(idCombinacao)){
    lblResultado1.html('Silogismo válido!');
    lblResultado1.style('color','green');
  }
  else{
    lblResultado1.html('Silogismo inválido!');
    lblResultado1.style('color','red');
    //console.log('Nr',slider.value(),'silogismo inválido!')
  }  
}
function montaPremMaior(){
  const term1=txtTermoMedio.value().toLowerCase()
  const term2=txtPredicado.value().toLowerCase()
  const figura=radioFigura.value()
  const premMaior=radioPremMaior.value()
  let afix=getAfix(figura, premMaior,term1,term2,1)      
  let retorno=afix.prefix+afix.term1+afix.middle+afix.term2  
  if (txtPremMaior){
     txtPremMaior.html(retorno)
  }
  return retorno
}

function montaPremMenor(){
  term1=txtTermoMedio.value().toLowerCase()
  term2=txtSujeito.value().toLowerCase()
  const figura=radioFigura.value()
  const premMenor=radioPremMenor.value()
  let afix=getAfix(figura, premMenor,term1,term2,2)      
  let retorno=afix.prefix+afix.term1+afix.middle+afix.term2  
  if (txtPremMenor){
     txtPremMenor.html(retorno)
  }
  return retorno
}

function montaConclusao(){
  term1=txtSujeito.value().toLowerCase();
  term2=txtPredicado.value().toLowerCase();
  const figura=radioFigura.value();
  const conclusao= radioConclusao.value()
  let afix=getAfix(figura,conclusao,term1,term2,3)      
  let retorno=afix.prefix+afix.term1+afix.middle+afix.term2  
  if (txtConclusao){
    txtConclusao.html(retorno)
  }
  return retorno
}

function hndTxtSujeito(){
  console.log(this.value())  
}
function hndTxtPredicado(){
  console.log(this.value())
}
function hndTxtTermoMedio(){
  console.log(this.value())
}
function hndRadioPremMaior(){
  let sliderVal=setSliderVal()
  slider.value(sliderVal)
}
function hndRadioPremMenor(){
  let sliderVal=setSliderVal()
  slider.value(sliderVal)
}
function hndRadioConclusao(){
  let sliderVal=setSliderVal()
  slider.value(sliderVal)
}
function hndRadioFigura(){
  if (radioFigura.value()==='1'){
    lblFigura1.html('TM-P')
    lblFigura2.html('S-TM')
    lblFigura3.html('S-P')    
  }
  if (radioFigura.value()==='2'){
    lblFigura1.html('P-TM')
    lblFigura2.html('S-TM')
    lblFigura3.html('S-P')    
  }
  if (radioFigura.value()==='3'){
    lblFigura1.html('TM-P')
    lblFigura2.html('TM-S')
    lblFigura3.html('S-P')
  }
  if (radioFigura.value()==='4'){
    lblFigura1.html('P-TM')
    lblFigura2.html('TM-S')
    lblFigura3.html('S-P')
  }
  let sliderVal=setSliderVal()
  slider.value(sliderVal)
  //console.log(this.value())  
  //console.log(radioFigura.value())  
  //return true;
}
function setSliderVal(){
  let selFigura=radioFigura.value()-1;
  let selPremMaior=radioPremMaior.value()-1;
  let selPremMenor=radioPremMenor.value()-1;
  let selConclusao=radioConclusao.value()-1;
  let valorAtualSlider=(selConclusao*64)+(selPremMenor*16)+
     (selPremMaior*4)+ selFigura+1;
  nrCombinacao.html(str(valorAtualSlider));
  montaPremissasEConclusao();
  //console.log(strResultadoVerificaRegras);
  /*
  console.log('Fig ',selFigura);
  console.log('PM ',selPremMaior);
  console.log('pm ',selPremMenor);
  console.log('C ',selConclusao);
  console.log('VAS ',valorAtualSlider);
  */
  return valorAtualSlider;
}

function mouseClicked() {
  if (mouseX > 670 && mouseX < 690 && mouseY > 230 && mouseY < 253) {
      slider.value(slider.value()+1);      
      setSlider();    
  }
  if (mouseX > 670 && mouseX < 690 && mouseY > 254 && mouseY < 274) {
      slider.value(slider.value()-1);      
      setSlider();    
  }   
 
  //nrCombinacao.html(slider.value());  
  //return false;
}
function mouseMoved() {

  if (mouseX > 670 && mouseX < 690 && mouseY > 230 && mouseY < 274) {   
    cursor('pointer');
  } else{
    cursor('default')
  }
  //console.log(mouseX, mouseY);
  //prevent default
  return false;
}

function draw() {
  background(200);  
  
  fill(50, 100, 220);  
  beginShape(TRIANGLES);
    vertex(680, 230);
    vertex(670, 250);
    vertex(690, 250);
    vertex(680, 274);
    vertex(670, 254);
    vertex(690, 254);
  endShape();
  //line(mouseX, mouseY+100, mouseX, mouseY-100);  
    
  pg.background(120);
  pg.noStroke();
  pg.ellipse(pg.width / 2, pg.height / 2, 25, 25);  
  image(pg, 650, 0);
  image(pg, 610, 10, 30, 30);  
  textSize(16);
  textFont('Verdana');
  fill(220, 40, 15);  
  text(strResultadoVerificaRegras, 30,500);     
}
