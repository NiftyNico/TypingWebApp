   var shift = 0;
   var caps = 0;
   
   var timer = 0;
   var phrase = "";
   var wordCount = 0;
   var words = 0;

   var curI = 0;
   var mistakes = 0;
   var color = 0;

   function printProg() {
       alert("You can type " + (wordCount * 60 / parseFloat(-timer)).toFixed(1) + " words per minute\nYou average "
           + (wordCount ? (parseFloat(mistakes) / wordCount).toFixed(1) : "an infinite") + " mistakes per word");
   }

   setInterval(function () {
       --timer > -60 ? $('#timer').text("Time Left: " + (timer + 60)) : $('#timer').text("Time Left: 0");
       if (timer == -60)
           printProg();
   }, 1000);

   function getWord() {
       return words[Math.floor(Math.random() * 235922)] + ' ';
   }

   function addLetter(name) {
       curI++;
       $('#textArea').html('&nbsp' + '<span style="color:green;">' + phrase.substr(0, curI) + '</span>' + phrase.substr(curI, phrase.length));
       $('#' + name.toLowerCase()).css('background-color', '#00FF00').delay(300).queue(function () { $(this).css('background-color', '#000000'); $(this).dequeue(); });
   }

   function updateCount() {
       color > 0 ? $('#mistakes').css('color', '#' + (color -= 10).toString(16) + '0000') : $('#mistakes').css('color', '#00' + (-(color -= 10)).toString(16) + '00');
       phrase = phrase.substring(curI + 1, phrase.length) + getWord();
       $('#textArea').html('&nbsp' + phrase);
       if(timer)
          $('#count').text("Word count = " + ++wordCount);
       curI = 0;
   }

   function insertNL(){
      $('#keyboard').append('<br>');
   }
  
   function deleteLast(){
       if (curI)
           curI--;
       $('#textArea').html('&nbsp' + '<span style="color:green;">' + phrase.substr(0, curI) + '</span>' + phrase.substr(curI, phrase.length));
   }

   function makeAlpha(alphabet){
      
      for(i = 0; i < alphabet.length; i++)
      {
         makeButton(alphabet[i]);
      }
   }

   function makeButton(name) {
       var tempButton = $('<button class="regular" id="' + name + '">' + name + '</button>');
       tempButton.value = name;
       tempButton.click(function () {
           if ((caps != shift && /^[a-zA-Z()]+$/.test(tempButton.value) &&
               tempButton.text().toUpperCase() == phrase[curI]) || (tempButton.text() == phrase[curI])) {
               addLetter(name);
           }
           else {
               updateMistakes(name);
           }
           shift = 0;
           setLowerSym();
           if ((!caps && !shift) || (caps && shift))
               setLowerAlpha();

           $('#shiftButton1').css('background-color', '#000000');
           $('#shiftButton2').css('background-color', '#000000');
       });

       $('#keyboard').append(tempButton);
   }
   
   function makeNumb(){
      for(i = 1; i <= 10; i++) {
         makeButton(i%10);
      }     
   }

   function makeShift(i){
      var tempButton = $('<button class="regular" id="shiftButton' + i + '">shift</button>');
      tempButton.click(function(){
         shift = shift ? 0 : 1;
         shift ? $(this).css('background-color', '#FF00FF') : $(this).css('background-color', '#000000');
         shift ? setUpperSym() : setLowerSym();
         shift != caps ? setUpperAlpha() : setLowerAlpha();
      });
      $('#keyboard').append(tempButton);      
   }

   function makeCaps(){
      var tempButton = $('<button class="regular" id="caps">Caps Lock</button>');
      tempButton.click(function(){
        caps = caps > 0 ? 0 : 1;
        caps ? $(this).css('background-color', '#FF00FF') : $(this).css('background-color', '#000000');
        shift != caps ? setUpperAlpha() : setLowerAlpha();
      });
       
      $('#keyboard').append(tempButton);      
   }

   function makeBack(){
      var tempButton = $('<button class="regular">Backspace</button>');
      tempButton.click(function(){
         deleteLast();
      });
      $('#keyboard').append(tempButton);
   }

   function makeSpace(){
      var tempButton = $('<button class="regular" id="space"></button>');
      tempButton.css('padding-right', '500px');
      tempButton.css('padding-left', '500px');
      tempButton.click(function() {
          checkKey(32);
      });
      $('#keyboard').append(tempButton);
   }

   function makeEnter(){
      var tempButton = $('<button class="regular">Enter</button>');
      tempButton.click(function() {
          checkKey(13);
      });
      $('#keyboard').append(tempButton);      
   }

   function makeKeyboard(){
      makeButton('`');
      makeNumb();
      makeButton('-');
      makeButton('=');
      makeBack();
      insertNL();
      makeAlpha("qwertyuiop[]\\");
      insertNL();
      makeCaps();
      makeAlpha("asdfghjkkl;'");
      makeEnter();
      insertNL();
      makeShift(1);
      makeAlpha("zxcvbnm,./");
      makeShift(2);
      insertNL();
      makeSpace();
   }

   function setUpperAlpha(){
      var str = "qwertyuiopasdfghjklzxcvbnm";
      for(i = 0; i < str.length; i++){
        $("#" + str[i]).html($("#" + str[i]).text().toUpperCase());
      }
   }

   function setLowerAlpha(){
      var str = "qwertyuiopasdfghjklzxcvbnm";
      for(i = 0; i < str.length; i++){
         $("#" + str[i]).html($("#" + str[i]).text().toLowerCase());
      }
   }

   function setUpperSym(){
      $('#1').html("!");
      $('#1').text("!");
      $('#2').html("@");
      $('#2').text("@");
      $('#3').html("#");
      $('#3').text("#");
      $('#4').html("$");
      $('#4').text("$");
      $('#5').html("%");
      $('#5').text("%");
      $('#6').html("^");
      $('#6').text("^");
      $('#7').html("&");
      $('#7').text("&");
      $('#8').html("*");
      $('#8').text("*");
      $('#9').html("(");
      $('#9').text("(");
      $('#0').html(")");
      $('#0').text(")");
   }

   function setLowerSym(){
      for(i = 0; i < 10; i++){
         $('#' + i).html(i%10);
         $('#' + i).text(i%10);         
      }
   }

   function updateMistakes(name) {
       color > 0 ? $('#mistakes').css('color', '#' + (color += 10).toString(16) + '0000') : $('#mistakes').css('color', '#00' + (-(color += 10)).toString(16) + '00');
       $('#mistakes').html("Mistakes = " + ++mistakes);
       $('#' + name).css({ 'background-color': '#FF0000' }).delay(300).queue(function () { $(this).css({ 'background-color': '#000000' }); $(this).dequeue(); });
   }

   function checkKey(key) {

       if (key == 13)
           printProg();
       else if (String.fromCharCode(key) == phrase[curI] || (key == 32 && phrase.charCodeAt(curI) == 13)) {
           $('#' + (key == 32 ? "space" : String.fromCharCode(key))).css({ 'background-color': '#00FF00'}).delay(300).queue(
               function () { $(this).css({ 'background-color': '#000000' }); $(this).dequeue(); });
           addLetter(key == 32 ? "space" : String.fromCharCode(key));
           if (key == 32)
               updateCount();
       } else {
           updateMistakes(key == 32 ? "space" : String.fromCharCode(key));
       }
   }

   $(document).ready(function() {
       makeKeyboard();

       $.ajaxSetup({ async: false });
       
       $.get('dict.txt', function (data) {
           words = data.split('\n');
       });
       
       phrase += getWord();
       phrase += getWord();
       phrase += getWord();
       phrase += getWord();
       phrase += getWord();
       phrase += getWord();

       
       $('#textArea').append(phrase);
       $(window).keypress(function (e) {
           var key = e.which;
           checkKey(key);          
      });
      $('html').keydown(function(e) {
          var key = e.keyCode;
          //alert(key);
          if (key == 20) {
              !caps ? caps++ : caps--;
              caps ? setUpperAlpha() : setLowerAlpha();
              caps ? $('#caps').css({ 'background-color': '#FF00FF' }) : $('#caps').css({ 'background-color': '#000000' });
          }
              
          if (key == 16) {
              shift++;
              setUpperAlpha();
              setUpperSym();
              $('#shiftButton1').css({ 'background-color': '#FF00FF' });
              $('#shiftButton2').css({ 'background-color': '#FF00FF' });
          }
         if(key == 8 || key == 46)
            deleteLast();
      });
      $('html').keyup(function (e) {
          var key = e.keyCode;
          if (key == 16) {
              shift--;
              setLowerSym();
              setLowerAlpha();
              $('#shiftButton1').css({ 'background-color': '#000000' });
              $('#shiftButton2').css({ 'background-color': '#000000' });
          }
      });
   });

