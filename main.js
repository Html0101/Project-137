status = "";
video = "";
objects = [];
objectWant = document.getElementById("objectWantDetect");
speech = window.speechSynthesis;

function setup() 
{ 
    canvas = createCanvas(480, 580);
    canvas.center();

    video = createCapture(480, 580);
    video.hide();
}

function start() 
{ 
    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() 
{ 
    console.log("Model Loaded");
    status = true;
}

function draw() 
{ 
    image(video, 0, 0, 480, 580);
    if (status != "" )
    { 
        objectDetector.detect(video, gotResult);
        for(i = 0; 1 < objects.length; i++)
        {
            

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label = objectWant) 
            { 
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status: Objects Wanted Detected Found";
                utterThis = SpeechSynthesisUtterance("Objects wanted detected found");
                speech.speak(utterThis);
            } else 
            { 
                document.getElementById("status").innerHTML = "Status: Object Wanted Detected Not Found";
            }
        }
    }
}

function gotResult(error, results){
    if (error) 
    { 
        console.error(error);
    }
    console.log(results);
    objects = results;
}