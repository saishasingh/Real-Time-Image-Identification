function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier("MobileNet",model_loaded);

  

}

function draw() {
  image(video,0,0,250,250);
 
  classifier.classify(video,got_results);
}

function model_loaded(){
  console.log("Model is loaded successfully");

} 


var previous_results = "";


 function got_results(error,results){
  if(error)
  console.error(error);

  else {
    if((results[0].confidence > 0.5) && (previous_results != results[0].label)){
    console.log(results);

  previous_results = results[0].label;

    document.getElementById("results_label").innerHTML = results[0].label;
    document.getElementById("results_accuracy").innerHTML = results[0].confidence.toFixed(2);
  
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance("Object detected is "+results[0].label);
    synth.speak(utterThis);  
  }}
 }