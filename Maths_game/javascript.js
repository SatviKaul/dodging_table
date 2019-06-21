var playing = false;
var score;
var action;
var timerem;
var correctanswer;
//if we click on start/reset
document.getElementById("startreset").onclick= function(){
    //if we are playing
        if(playing==true){
            location.reload(); //reload page
        }
    else{               //if we are not playing
        playing=true;   //change mode to playing
        score = 0;      //set score to zero 
        document.getElementById("scorevalue").innerHTML=score;
        //show countdown box
        show("time");
        timerem=60;
        document.getElementById("timeremvalue").innerHTML=timerem;
        hide("gameover");
        // change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
         //reduce time by 1 sec in loops(countdown)
        startcountdown();
         //generate new Q&A
        generateQA();

    }  
}    
//clicking on an answer
for(i=1;i<5;i++){
    document.getElementById("box"+ i).onclick= function(){
    if(playing==true){
        if(this.innerHTML == correctanswer){
            score++; document.getElementById("scorevalue").innerHTML=score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },2000);
            //generate new Q/A
            generateQA();
        }
        else{
            hide("correct");
            show("wrong");   
            setTimeout(function(){
                hide("wrong");
            },2000);
        }
        }
    }
}

    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box 1sec
//functions
    //start counter
    //stop counter

function startcountdown(){
    action= setInterval(function(){
        timerem -= 1;
         document.getElementById("timeremvalue").innerHTML=timerem;
        if(timerem==0){
            //gameover
            stopcountdown();
            show("gameover");
             document.getElementById('gameover').innerHTML="<p>GAME OVER!</p><p>YOUR SCORE IS " + score + "</p>";
            
            hide("time");
            hide("correct");
            hide("wrong");
            playing=false;
             document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000);
}

function stopcountdown(){
    clearInterval(action);
}
//hide an element
function hide(Id){
    document.getElementById(Id).style.display="none";
}
//show an element
function show(Id){
     document.getElementById(Id).style.display="block";
}
//generate question and multiple answers.
function generateQA(){
    var x= 1+Math.round(9*Math.random());
    var y= 1+Math.round(9*Math.random());
    correctanswer=x*y;
    document.getElementById("question").innerHTML= x + "x" + y;
    var correctposition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctposition).innerHTML= correctanswer;   //fill one box with correct ans
    var answers = [correctanswer];
    
    for(i=1;i<5;i++){
        if(i != correctposition){
          var wronganswer;             //wrong answer
            do{
                wronganswer =( 1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));  
            }
            while(answers.indexOf(wronganswer)>-1)
            document.getElementById("box"+i).innerHTML=wronganswer;
            answers.push(wronganswer);
        }
    }
}