/**
 * Created by guillaumemartinez on 27/01/15.
 */

//////////////////////
//    Global Var    //
//////////////////////
google.load('visualization', '1.1', {packages: ['line']});
var QUOTES = [];
var THETEXT = "";
var DONEQUOTE = [];
var whereAmI = 0;
var whichWord = 0;
var ERREUR = false;
var typing = false;
// Jquery Selector
var $window = $(window);
var $typingArea = $('.TypingArea');
var $textToType = $('.TextToType');
var $inputTyping = $('.InputTyping');
var $changeQuote = $('.ChangeQuote');
var $title = $('.title');
var $author = $('.author');

var $statsArea = $('.StatsArea');
var $wpm = $('.WPM');
var $nb = $('.Nb');
var $errors = $('.Errors');
var $accuary = $('.Accuary');
//Stats
var STATS = {};
var realTimeWPM = [];
var beginTime;
var endTime;
var errorsCount = 0;
//////////////////////
//     Function     //
//////////////////////

// Min >= Int > Max
function randIntBorne(min,max){
  return Math.floor((Math.random() * (max-min)) + min);
}

//////////////////////
//       Main       //
//////////////////////

//Recup des quotes
$.getJSON("json/quotes.json",function(data){
  QUOTES = data.quotes;

  STATS.MoyWPM = null;
  STATS.Errors = null;
  STATS.Accuary = null;
  STATS.Nb = 0;
  Main();
});

function Main(){
  var selectedQuote = randIntBorne(0,QUOTES.length);
  THETEXT = QUOTES[selectedQuote].text;
  $textToType.html(THETEXT.addSpan());
  $title.html(QUOTES[selectedQuote].title);
  $author.html(QUOTES[selectedQuote].author);
  whereAmI = 0;
  whichWord = 0;
  colorizeWord(0,"green");
  errorsCount = 0;
  $inputTyping.val("");
  beginTime = null;
  realTimeWPM = [];
  typing = true;
}

function asciiToChar(code){
  return String.fromCharCode(code);
}

function colorizeWord(id,color){
  //Decolore tout le texte
  $('.mot').css("background","none");
  //Colore le mot
  $('.mot_'+id).css("background",color);
}

function calculeWPM(begin,end){
  var res = Math.round((THETEXT.substr(0,whereAmI+1).countMot() / ((end - begin) / 60000)) *100) / 100;
  return res;
}

function Stats(){
  var wpm = 0;
  for(var i=0;i<realTimeWPM.length;i++){
    if(realTimeWPM[i][0]>100) {
      realTimeWPM[i][0] = 100;
    }
    wpm += realTimeWPM[i][0];
  }
  wpm = wpm/realTimeWPM.length;
  var time = (new Date((new Date() - beginTime)));
  var accuary = Math.round((1-(errorsCount/whereAmI))*100);

  return {
    WPM: wpm,
    TotalTime: time,
    Errors: errorsCount,
    Accuary: accuary
  }
}

function End(){
  typing = false;
  stats = Stats();
  $textToType.html('<div class="Resultats">' +
  '<h2>WPM: </h2>' +
  '<div class="WPM">'+(Math.round(stats.MoyWPM*100)/100)+'</div>' +
  '<h2>Total Time: </h2>' +
  '<div class="Time">'+stats.TotalTime.HHMMSS()+'</div>' +
  '<h2>Errors: </h2>' +
  '<div class="Errors">'+stats.Errors+'</div>' +
  '<h2>Accuary: </h2>' +
  '<div class="Accuary">'+stats.Accuary+'%</div>' +
  '</div>' +
  '<div id="WPMGraph" class="Graphique"></div>');

  // Dessine le graphique WPM
  drawChart(realTimeWPM,'WPMGraph','RealTime WPM',['WPM','Erreurs'],"100%",250);

  if(STATS.Nb>0) {
    STATS.MoyWPM = ((STATS.MoyWPM * STATS.Nb) + stats.WPM) / (STATS.Nb + 1);
    STATS.Errors = ((STATS.Errors * STATS.Nb) + stats.Errors) / (STATS.Nb + 1);
    STATS.Accuary = ((STATS.Accuary * STATS.Nb) + stats.Accuary) / (STATS.Nb + 1);
  } else {
    STATS.MoyWPM = stats.WPM;
    STATS.Errors = stats.Errors;
    STATS.Accuary = stats.Accuary;
  }
  STATS.Nb++;
  $wpm.html("~"+(Math.round(STATS.MoyWPM*100)/100));
  $nb.html((STATS.Nb));
  $errors.html("~"+(Math.round(STATS.Errors*100)/100));
  $accuary.html("~"+(Math.round(STATS.Accuary*100)/100)+"%");
}

function drawChart(wpm,div,title,legende,width,height) {

  var data = new google.visualization.DataTable();
  data.addColumn('number', '');
  data.addColumn('number', legende[0]);
  data.addColumn('number', legende[1]);

  data.addRows([]);
  for(var i=0; i<wpm.length; i++){
    data.addRows([
      [i,wpm[i][0],(+wpm[i][1])*10]
    ]);
  }

  var options = {
    chart: {
      title: title,
      subtitle: ''
    },
    width: width,
    height: height
  };

  var chart = new google.charts.Line(document.getElementById(div));

  chart.draw(data, options);
}

//Renvoi l'heure sous forme HH:MM:SS
Date.prototype.HHMMSS = function(){
  var H, M, S;
  H = this.getHours()-1;
  M = this.getMinutes();
  S = this.getSeconds();

  if(H<10)
    H = "0"+H;
  if(M<10)
    M = "0"+M;
  if(S<10)
    S = "0"+S;

  return H+":"+M+":"+S;
};

String.prototype.addSpan = function(){
  var res = "";
  var idMot = 0;
  res = "<span class='mot mot_"+idMot+"'>";
  for(var i=0; i<this.length; i++){
    if(this[i] != " "){
      res += this[i];
    } else {
      idMot++;
      res += "</span> <span class='mot mot_"+idMot+"'>";
    }
  }
  res +="</span>";

  return res;
};

String.prototype.countMot = function (){
  var nb = 0;
  var lastChar = "";
  for(var i=0; i<this.length; i++){
    if(this[i] == " " && this[i] != lastChar){
      nb++;
    }
    lastChar = this[i];
  }
  return nb;
};
//////////////////////
//       Event      //
//////////////////////

$window.keydown(function(event){
  if (!(event.ctrlKey || event.metaKey || event.altKey)) {
    $inputTyping.focus();
  }
  if(!beginTime){
    beginTime = new Date();
  }
});

$inputTyping.keyup(function(){
  if(typing) {
    whereAmI = this.value.length - 1;
    if (whereAmI < 0)
      whereAmI = 0;

    if (THETEXT.substr(0, whereAmI + 1) == this.value) {
      ERREUR = false;
      $textToType.css("border-color", "#444");

    } else {
      ERREUR = true;
      errorsCount++;
      $textToType.css("border-color", "red");
    }

    realTimeWPM.push([calculeWPM(beginTime, new Date()), ERREUR]);

    if (ERREUR) {
      colorizeWord(whichWord, "red");
    } else {
      whichWord = this.value.countMot();
      colorizeWord(whichWord, "green");

      if (THETEXT.length == this.value.length) {
        $textToType.css("border-color", "green");
        End();
      }
    }
  }
});

$changeQuote.click(function(){
  Main();
});

$inputTyping.bind("paste",function(event){
  event.preventDefault();
});