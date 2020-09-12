var canvas = document.querySelector('canvas');
canvas.width = 1980
canvas.height = 1080
var c = canvas.getContext('2d');
var splash_is = false;
var splash_pos_x = 0;
var splash_pos_y = 0;


function drawBackground(){
    var gradient = c.createLinearGradient(0,0,0,canvas.height / 1.35);
    gradient.addColorStop(0,'#6f00c0');
    gradient.addColorStop(0.5,'#e65a66');
    gradient.addColorStop(0.75,'#ec9618');
    gradient.addColorStop(1,'#e5c216');
    c.fillStyle = gradient;
    c.fillRect(0,0,canvas.width, canvas.height);
    
}

function DrawMountain(){
    //Trianngle Middle left
    c.beginPath();
    c.moveTo(canvas.width/3 - canvas.width/10,canvas.height/2 + canvas.height/6);
    c.lineTo((canvas.width/3 + canvas.width/2) / 2 - canvas.width/10 ,canvas.height/3);
    c.lineTo(canvas.width/2 - canvas.width/10 ,canvas.height/2 + canvas.height/6);
    c.fillStyle = '#141207';
    c.fill();
   //Triangle First To left
   c.beginPath();
   c.moveTo(-20,canvas.height/2 + canvas.height/6);
   c.lineTo(canvas.width/6,canvas.height/4);
   c.lineTo(canvas.width/3,canvas.height/2 + canvas.height/6);
   c.fillStyle = '#141207';
   c.fill();
   //Last Triangle
   c.beginPath();
   c.moveTo(canvas.width/2 + canvas.width/6, canvas.height/2 + canvas.height/6);
   c.lineTo(canvas.width/2 + (canvas.width/6 + canvas.width/2) / 2,canvas.height/2 - canvas.height / 4);
   c.lineTo(canvas.width/2 + canvas.width/1.9, canvas.height/2 + canvas.height/6);
   c.fillStyle = '#141207';
   c.fill();
   //Triangle Middle right
   c.beginPath();
   c.moveTo(canvas.width/3 - canvas.width / 9,canvas.height/2 + canvas.height / 4);
   c.lineTo(canvas.width/2 + canvas.width/30,canvas.height/8);
   c.lineTo(canvas.width/2 + canvas.width/3 ,canvas.height / 2 + canvas.height / 4);
   c.fillStyle = '#141207';
   c.fill();
       //down platform
       gradient = c.createLinearGradient(0,canvas.height/2 + canvas.height/6,0,canvas.width - canvas.height/2 + canvas.height/6);
       gradient.addColorStop(0,'#141207');
       gradient.addColorStop(0.3,'#001a21');
       gradient.addColorStop(1,'#001a21');
       c.fillStyle = gradient;
       c.fillRect(0,canvas.height/2 + canvas.height/6,canvas.width + 200,canvas.width - canvas.height/2 + canvas.height/6);
       
}


 function drawstar(position_x,position_y,size,){
     //Function Drawing Wheel in position x/y in size
     
        c.beginPath();
        c.arc(position_x,position_y,size,0,Math.PI * 2,false);
        c.strokeStyle = 'white';
        c.fillStyle = "white";
        c.fill();
        c.stroke();
}

function drawcolorstar(position_x,position_y,size,color){
    //Function Drawing Wheel in position x/y in size
    
       c.beginPath();
       c.arc(position_x,position_y,size,0,Math.PI * 2,false);
       c.strokeStyle = color;
       c.fillStyle = color;
       c.fill();
       c.stroke();
       
}

var stars = [];

function CreateStars(howmany){
    //Updates Array stars
    for(var x = 0; x < howmany; x++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 300,
        size: Math.random() * 2,
        time_to_shy: Math.random() * 20 + 10,
        timee : 0
    });
 
    }
}


var colapsingstars = [];
var controler_colapse = 0;

function CreateColapsingStar(){
    colapsingstars.push({
        x: Math.random() * canvas.width + 400,
        y: Math.random() * 150,
        sizee: 0.5,
        trailcolor: '',
        lambda: -10
    });
}

CreateStars(350);

function drawStars(){
    //function changes position of stars and draws them
    for(var a = 0; a < 350; a++){
        stars[a].x -= 0.3;
        if(stars[a].x < 0){
            stars[a].x = canvas.width;
        }
        stars[a].timee += 5;
        if(stars[a].timee >= stars[a].time_to_shy){
            stars[a].timee = 0;
            stars[a].size = Math.random() * 2;
        }
    }

    for(var b = 0; b < 350; b++){
        drawstar(stars[b].x,stars[b].y,stars[b].size);
    }


    

}
function drawcolapsingstar(){
    
    controler_colapse++;
    if(controler_colapse >= 15){
        CreateColapsingStar();
        controler_colapse = Math.random() * 10;
    }
    if(colapsingstars.length > 0){
    splash_is = false;
        for(var c = 0; c < colapsingstars.length; c++){
    drawstar(colapsingstars[c].x,colapsingstars[c].y, colapsingstars[c].sizee);
    colapsingstars[c].y -= colapsingstars[c].lambda;
    colapsingstars[c].lambda = -60;
    colapsingstars[c].x -= 30;
    colapsingstars[c].sizee += 0.5;
    if(colapsingstars[c].y > canvas.height - 450 + Math.random() * 300){
        if(!splash_is){
        splash_is = true;
        }
        splash_pos_x = colapsingstars[c].x;
        splash_pos_y = colapsingstars[c].y;
        colapsingstars.splice(c,1);
    }
   
    }
}


}

var splash_bals = [];

function splash(){
    
    if(splash_is){
        
        for(var z = 0; z < 60; z++){
        splash_bals.push({
            x: splash_pos_x + Math.random() * 2,
            y: splash_pos_y,
            size: 2,
            counter: Math.random() * 150,
            speed_x: Math.random() * 4 * Math.cos(Math.random() * 360),
            speedy_y: Math.random() * 6 * Math.cos(Math.random() * 360) + 4,
            lambda: -0.1,
            color:  'rgb(' + 255 + ',' +  Math.random() * 150 + ',' +  Math.random() * 250 + ')'
        });
        console.log("ola");
        splash_is = false;
    
    }
    }
    for(var z = 0; z < splash_bals.length; z++){
        splash_bals[z].counter--;
        drawcolorstar(splash_bals[z].x,splash_bals[z].y,splash_bals[z].size,splash_bals[z].color) ;
        if(splash_bals[z].counter <= 0){
            splash_bals.splice(z,1);
            console.log("ala");
        }
        splash_bals[z].x += splash_bals[z].speed_x;
        splash_bals[z].y += splash_bals[z].speedy_y;
        splash_bals[z].speed_x += splash_bals[z].lambda ;
        splash_bals[z].speedy_y += splash_bals[z].lambda / 6;
        splash_bals[z].size = Math.random() * 4;
    }
    
}


setInterval(function(){c.clearRect(0,0,canvas.width, canvas.height); drawBackground(); drawStars(); DrawMountain(); drawcolapsingstar(); splash();}, 50);


