let i = 0;
let width = window.innerWidth;
let height = window.innerHeight;
let margin = 25;
let myaudio;

// for dataaa
let table;

// beginning text stuff
let counter = 0;
let textDiv = document.querySelector(".startTextDiv");
let startText = document.querySelector(".typewriteStarTxt");
const startTextContent = "For some it is freedom.";

// pause button stuff
let simPlaying = true;
let buttonWidth = 200;
let buttonHeight = 60;
let buttonLabel = 'Pause';

// slider stuff
let currentYear;
let drawn = false;

// filter buttns
let deathFiltered = true;
let childFiltered = false;

let filteredText = '';


function typeWriter() {
    if(frameCount > 5 * 60){
    if(counter < startTextContent.length){
        startText.textContent += startTextContent[counter];
        counter ++;
    }}
}
setInterval(typeWriter, 80);

function preload() {
    table = loadTable("cleaned-children5.csv", "csv", "header");
    // soundFormats('mp3');
    // myaudio = loadSound("assets/freedom.mp3");
}

function setup() {
    createCanvas(width, height);
    background(19, 26, 43);
    noStroke();

    // all the data
    years = table.rows.map((r) => r.getNum("Year of arrival at port of disembarkation"));
    embarked = table.rows.map((r) => r.getNum("Total embarked"));
    disembarked = table.rows.map((r) => r.getNum("Total disembarked"));
    deaths = table.rows.map((r) => r.getNum("Total died"));
    children = table.rows.map((r) => r.getNum("Number of Children"));
}

function draw(){
    if (frameCount == (60 * 11.9)) {
        textDiv.style.visibility = 'hidden';
        // myaudio.play();

        // stuff for the pause/play button
        startButton = createButton(buttonLabel);
        startButton.position(width - margin - buttonWidth, height - margin - buttonHeight);
        startButton.mousePressed(pause);
        startButton.style('font-size', '30px');
        startButton.style('width', '200px');
        startButton.style('border-radius', '20px');
        startButton.style('border-width', '0.2em');
        startButton.style('border-color', color(91, 143, 156));
        startButton.style('padding', '10px');
        startButton.style('background-color', color(123, 200, 220));

        // stuff for the slider
        yearSlider = createSlider(0, years.length - 1, 0, 1);
        yearSlider.position(margin + 440 + (width * 0.015) * 5, height - (margin * 4.2));
        yearSlider.input(sliderUsed);
        yearSlider.size(buttonWidth);

        deathBtn = createButton('Number of Deaths');
        deathBtn.position(margin + (width * 0.015) * 5, height - (margin * 4.2));
        deathBtn.style('background-color', color(247, 140, 139));
        deathBtn.style('border-radius', '3px');
        deathBtn.style('border-color', color(237, 109, 107));
        deathBtn.style('font-size', '16px');
        deathBtn.style('width', '200px');
        deathBtn.mousePressed(deathbtnpressed);

        childBtn = createButton('Number of Children');
        childBtn.position(margin + 220 + (width * 0.015) * 5, height - (margin * 4.2));
        childBtn.style('background-color', color(255, 245, 158));
        childBtn.style('border-radius', '3px');
        childBtn.style('border-color', color(237, 224, 107));
        childBtn.style('font-size', '16px');
        childBtn.style('width', '200px');
        childBtn.mousePressed(childbtnpressed);
        
    }
    else if (frameCount < 60 * 11.9){
    }
    else{
        if(simPlaying){
            if(frameCount % (60 * 2) == 0){
                if(i < embarked.length){
                    drawEmbarked(i);
                    i ++;
                    // updates the slider value to move with the visualisation :3
                    yearSlider.value(i);
                } 
            }
        }
        // runs when the sliders been used, making it stop drawing the thing over and over
        else if(!drawn){
            i = yearSlider.value();
            drawEmbarked(i);
            drawn = true;
        }
    }
}

// runs when the pause button is pressed
function pause(){
    if(simPlaying){
        simPlaying = false;
        buttonLabel = "Play";
    }
    else{
        simPlaying = true;
        buttonLabel = "Pause";
    }
    startButton.html(buttonLabel);
}

// runs when the slider is used, paused it and then says updates draw variable so it stops drawing the same thing multiple times
function sliderUsed(){
    simPlaying = false;
    startButton.html("Play");
    drawn = false;

}

function deathbtnpressed(){
    deathFiltered = true;
    childFiltered = false;
    drawEmbarked(i);

}

function childbtnpressed(){
    deathFiltered = false;
    childFiltered = true;
    drawEmbarked(i);

}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function drawEmbarked(index) {
    // for the entire length of the array, loop through the array index and do this
    // background(19 + (81/2) - (index/2), 26 + (81/2) - (index/2), 43 + 81 - index);
    background(19, 26, 43);

    for(let j = 0; j < embarked[index]; j++){
        x = random(margin, width - margin);
        y = random(margin, height - ( margin * 5));
        points = random(3, 15);


        fill(245, 235, 215, cos(j) * 20 + 50);
        
        let diameter = cos(j) * 2 + 6;

        // writing it out so i can figure out wth im doing
        // imagine 10 people embark, 2 disembark, 8 died, i want 8 red
        // using disembarked - if the index is greater than the disembarked, make them red. this would mean anything higher than 2 is red. so 8 are red
        // using deaths - if the index is less than the deaths, make them red.

        // i wanna draw the deaths last though so
        // 10 on, 2 off, 8 dead
        // index less than the deaths, draw, thisll draw them first
        // index higher than disembarked, draws them, thisll draw them last
        if (deathFiltered){
            if(j >= disembarked[i]){
                fill(255 ,0 ,0, cos(j) * 20 + 50);
            }
            filteredText = (("       Died: " + deaths[index]));
        }
        // imagine 100 people, 40 children
        // if its less than 40, draw them in yellow
        else if (childFiltered){
            // if(j <= children[i]){
            // wanna draw children last:
            // if j is greater than embarked length - children
            if(j >= embarked[i] - children[i]){
                // fill(245, 227, 66, cos(j) * 20 + 50);
                fill(255, 228, 54, cos(j) * 20 + 50);
            }
            filteredText = (("       Children: " + children[index]));
        }
        
        star(x, y, diameter / 2, (diameter), points)
        // circle(x, y, diameter);

    }
    // write the text on the bottom hereee
    fill(200);
    textSize(width * 0.02);
    textAlign(LEFT);
    text(("Year: " + years[index]) + ("       Embarked: " + embarked[index]) + ("       Disembarked: " + disembarked[index]) + filteredText, margin, height - margin);

    textSize(width * 0.015);
    text('Display: ', margin, height - (margin * 3.3));
}