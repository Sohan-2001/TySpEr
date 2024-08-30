// Enter Fullscreen Function
function enterFullScreen() {
  try {
    const element = document.documentElement;

    if (document.fullscreenEnabled && element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.requestFullscreen) { // Other browsers
      element.requestFullscreen();
    } else {
      console.log("Fullscreen API is not supported in this browser.");
    }
  } catch (error) {
    console.error(error);
    alert(error)
  }
}




// Handle Fullscreen Change
function handleFullscreenChange() {
  try{
    if (!document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement) {
    location.reload();
  }
  } 
  catch(error){
    window.alert(error)
  }
  
}

// Add Fullscreen Event Listeners
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

// Prevent Specific Key Combinations
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.key === 'F12' || (event.ctrlKey && (event.key === 'I' || event.key === 'J' || event.key === 'C' || event.key === 'U'))) {
      event.preventDefault();
  }
});

// Developer Tools Detection
function devToolsOpen() {
  const element = new Image();
  Object.defineProperty(element, 'id', {
      get: function() {
          alert('Developer tools detected! Please close them.');
      }
  });
}

// Show Popup
function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.querySelector('p').textContent = 'If You Exit The Full Screen Mode Then The Page Will Be Reloaded.';
  popup.style.display = 'flex';
}

// Close Popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

// Make the div editable and restrict actions
const editableDiv = document.getElementById('editable-div');
editableDiv.contentEditable = true;
editableDiv.addEventListener('cut', (e) => e.preventDefault());
editableDiv.addEventListener('copy', (e) => e.preventDefault());
editableDiv.addEventListener('paste', (e) => e.preventDefault());
editableDiv.addEventListener('contextmenu', (e) => e.preventDefault());

// Dark-Light Mode Functions
function darkMode() {
  try{
    const navbar = document.querySelector('.navbar');
  const cards = document.querySelectorAll('.card');
  navbar.dataset.bsTheme = 'dark';
  cards.forEach(card => card.dataset.bsTheme = 'dark');
  document.body.style.background = 'black';
  }
  catch(error){
    window.alert(error)
  }
  
}

function lightMode() {
  const navbar = document.querySelector('.navbar');
  const cards = document.querySelectorAll('.card');
  navbar.dataset.bsTheme = 'light';
  cards.forEach(card => card.dataset.bsTheme = 'light');
  document.body.style.background = 'white';
}

// Text Generation Functions
let string_ = '';

function genTextEasy() {
  showPopup();
  enterFullScreen();
  const text1 = `@MASK is the developer account held by Sohan Karfa. This website is built for learning purposes but can be a good enterprise solution for training and testing of typing speed with accurate results and tough texts to type in Medium and Hard sections.`;
  string_ = text1;
  document.getElementById('showText').innerHTML = string_;
}

function genTextMedium() {
  showPopup();
  enterFullScreen();
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789";
  let result = "";
  while (result.length < 1000) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  }
  string_ = result;
  document.getElementById('showText').innerHTML = string_;
}

function genTextHard() {
  showPopup();
  enterFullScreen();
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%^&*()_+}{,.';[]:?><~/*+";
  let result = "";
  while (result.length < 1000) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  }
  string_ = result;
  document.getElementById('showText').innerHTML = string_;
}

// Timer Functions
let startTime;
let endTime;
let timeDifference;

function startTimer() {
  if (!startTime) {
    startTime = new Date();
  }
}

function stopTimer() {
  endTime = new Date();
  timeDifference = (endTime - startTime) / 1000; // time difference in seconds
}

editableDiv.addEventListener('keydown', startTimer);

// Levenshtein Distance Function
function levenshteinDistance(string1, string2) {
  const len1 = string1.length;
  const len2 = string2.length;

  if (len1 === 0) {
    return len2;
  }
  if (len2 === 0) {
    return len1;
  }

  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = string1[i - 1] === string2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1,        // Deletion
                          dp[i][j - 1] + 1,        // Insertion
                          dp[i - 1][j - 1] + cost); // Substitution
    }
  }

  return dp[len1][len2];
}

// Check Text Function
function checkText() {
  stopTimer();
  const typedText = editableDiv.textContent || editableDiv.innerText;
  const string1 = string_;
  const string2 = typedText;
  const dis = levenshteinDistance(string1, string2);
  const accuracy = typedText.length - dis;
  let acc = Math.floor((accuracy / string_.length) * 100);
  let speed = Math.ceil((accuracy / timeDifference));
  if (speed < 0) {
    speed = 0;
  }
  if (acc < 0) {
    acc = 0;
  }
  const cardBody = document.querySelector('.card.card3 .card-body');
  cardBody.innerHTML = `Speed (including accuracy): ${speed} characters per second<br><br>Accuracy: ${acc} percent`;
}

// Show Details Popup
function DetailsshowPopup() {
  const popup = document.getElementById('Detailspopup');
  popup.querySelector('p').innerHTML = `Developed by @MASK<br><br>Tech Stack: HTML, JavaScript, CSS, Bootstrap<br>Algorithm: Levenshtein Distance<br><br>Developer: Sohan Karfa<br>Email: sohan100karfa@gmail.com<br><br>Working: It measures the Levenshtein Distance between the given and typed string to calculate the number of dissimilarities and calculate the accuracy and speed.`;
  popup.style.display = 'flex';
}

// Close Details Popup
function DetailsclosePopup() {
  const popup = document.getElementById('Detailspopup');
  popup.style.display = 'none';
}


// Show Feedback Pop-Up
function FeedbackPopup() {
  document.getElementById("Feedbackpopup").style.display = "block";
}

function FeedbackclosePopup() {
  document.getElementById("Feedbackpopup").style.display = "none";
}
