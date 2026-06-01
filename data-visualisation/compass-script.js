let width = window.innerWidth;
let height = window.innerHeight;
let margin = 25;
let myaudio;
let i = 0
let table;
let startButton;

let xcoords = []
let ycoords = []

let started = false;
let options = document.querySelectorAll('#option')
let counter = 0;
let heightfraction = ((height - 70)/ options.length)


const questionTextBox = document.querySelector(".title");
const questionTextContent = "hat is it you want most?"

function typeWriter() {
    if(counter < questionTextContent.length){
        questionTextBox.textContent += questionTextContent[counter];
        counter ++;
    }
}
setInterval(typeWriter, 100);

for(option in options){
    // get the height, divide the height by the number of options
    heightsegment = heightfraction * (Math.round(option) + 1)
    // console.log(options.length)
    // console.log(height / options.length)
    // console.log(heightfraction)
    // console.log(height)
    // o = (Math.round(option) + 1)
    // console.log('option: ' + o)


    y = heightsegment - (heightfraction / 2) 
    console.log(y)


    if(option % 2 == 0){
        x = (Math.random() * (width/7))
        xcoords.push(x)
    }
    else{
        x = Math.floor(Math.random() * ((width/3 + width/2) - (width/5 + width/2)) ) + (width/5 + width/2);
    }

    // ycoords.push(y)

    options[option].style.left = x + 'px';
    options[option].style.visibility = 'hidden';
    options[option].style.top = y + 'px';
}
function preload() {
    soundFormats('mp3');
    myaudio = loadSound("assets/want_most.mp3");
}

function setup() {
    createCanvas(width, height);
    background(51, 38, 34);

    noStroke();
    angleMode(DEGREES)
    startButton = createButton('Choose');
    startButton.position(width/2 - 100, height/2);
    startButton.mousePressed(addStart);
}



function draw(){
    if(!started){
        startButton.style('font-size', '30px');
        startButton.style('width', '200px');
        startButton.style('border-radius', '20px');
        startButton.style('border-width', '0.2em');
        startButton.style('border-color', color(91, 143, 156));
        startButton.style('padding', '10px');
        startButton.style('background-color', color(123, 200, 220));
        return
    }
    background(51, 38, 34);
    compassbg();

    push();
    translate(width/2, height/2);
    rotation(mouseX, mouseY)
    compassNeedle();
    pop();


    startButton.mousePressed(addStart);


}
function addStart(){
    if(!started){
        started = true;
        startButton.hide();
        userStartAudio();
        myaudio.play();
        for(option in options){
            options[option].style.visibility = 'visible';
        }
    }
}
    

function compassbg(){
    noFill();
    stroke(204, 159, 88)
    fill(232, 210, 176)
    strokeWeight(15)

    circle(width/2, height/2, height - height / 3)
    
    noStroke();
    fill(0)
    textSize(50)
    textAlign(CENTER)

    text('N', width/2, height/4)
    text('E', width/2 + (height/2 - height / 4), height/2)
    text('W', width/2 - (height/2 - height / 4), height/2)
    text('S', width/2, height - height/5)
}

function compassNeedle(){
    strokeWeight(7)
    fill(191, 184, 174)
    stroke(204, 159, 88)

    // quad(width/2, height/2,
    //     width/2 - 47, height/2 - 40,
    //     width/2, (height - height/3),
    //     width / 2 + 47, height/2 - 40
    // )


    // quad(0, 0,
    //     -47, -40,
    //     0, (height)/5 - 20,
    //     47, -40
    // )
    
    quad(0, -40,
        -35, 40,
        0, (height)/5 - 20,
        35, 40
    )
    

    fill(170, 50, 50);
    // circle(width/2, height/2, height/4)
    // quad(width/2, height/2,
    //     width/2 - 50, height/2 - 50,
    //     width/2, (height/2 - height/3) + 20,
    //     width / 2 + 50, height/2 - 50
    // )

    
    quad(0, 0,
        -50, -50,
        0, - (height)/3 + 20,
        50, -50
    )

    fill(217, 176, 111)
    circle(0, 0, 30)

    
}


function rotation(x, y){
    
    r = atan2(y - height/2, x - width/2);
    // r = atan2(x, y)
    rotate(r +90)
    
}

