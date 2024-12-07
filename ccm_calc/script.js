// slider js
document.addEventListener("DOMContentLoaded", function () {
  main();
  updateSlider()
});

function updateSlider(){
  const sliders = document.querySelectorAll(".slider");
  function updateRangePercent(slider, result) {
    return function () {
      const rangePercent = slider.value + "%";
      result.textContent = rangePercent;
      if(slider.value > 50){
        left = slider.value/100*slider.offsetWidth - 26;
      }
      else{
        left = slider.value/100*slider.offsetWidth - 21;
      }
      result.style.left = left + "px" ;
    };
  }
  
  sliders.forEach(function (slider) {
    const result = slider.nextElementSibling; // Assumes the result is the next element
    const update = updateRangePercent(slider, result);
    if(slider.value > 50){
      left = slider.value/100*slider.offsetWidth - 26;
    }
    else{
      left = slider.value/100*slider.offsetWidth - 21;
    }
    // Initial call to set the value on page load
    update();
  
    slider.addEventListener("input", update);
    slider.addEventListener("change", update);
  });

}

// cloud provider select

const awsContainer = document.getElementById("aws-container");
const azureContainer = document.getElementById("azure-container");
const gcpContainer = document.getElementById("gcp-container");
const cloudProvider = document.getElementById("cloudProvider");
const commitmentOrchestrator = document.getElementById(
  "commitment-orchestrator"
);
let selectedValue = "gcp";
let selectedProvider = awsContainer;
awsContainer.style.display = "block";
gcpContainer.style.display = "none";
azureContainer.style.display = "none";
let selectedRadioButton = undefined;
function main() {
  selectedRadioButton = cloudProvider.querySelector(
    'input[name="cloudProvider"]:checked'
  );
  updateSlider();
  if (selectedRadioButton) {
    selectedValue = selectedRadioButton.value;
    if (selectedValue === "aws") {
      calculateAws(awsContainer);
      awsContainer.style.display = "block";
      gcpContainer.style.display = "none";
      azureContainer.style.display = "none";
      commitmentOrchestrator.style.display = "flex";
    } else if (selectedValue === "gcp") {  
      calculateGcp(gcpContainer);
      awsContainer.style.display = "none";
      gcpContainer.style.display = "block";
      azureContainer.style.display = "none";
      commitmentOrchestrator.style.display = "none";
    } else if (selectedValue === "azure") {
      calculateAzure(azureContainer);
      awsContainer.style.display = "none";
      gcpContainer.style.display = "none";
      azureContainer.style.display = "block";
      commitmentOrchestrator.style.display = "none";
    }
  }
}

cloudProvider.addEventListener("change", main);
const mainContainer = document.getElementById("container");
const allInput = mainContainer.querySelectorAll("input");
allInput.forEach((input) => {
  input.addEventListener("input", main);
});

const numInputs = document.querySelectorAll("input[type=number]");
numInputs.forEach(function (input) {
  input.addEventListener("input", function (e) {
    if (e.target.value == "") {
      e.target.value = 0;
      main();
    }
  });
});
