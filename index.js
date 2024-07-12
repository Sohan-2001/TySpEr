
document.addEventListener('contextmenu', event => event.preventDefault());

function enterFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else {
    console.log("Fullscreen API not supported");
  }
}

function handleFullscreenChange() {
  if (!document.fullscreenElement && 
      !document.mozFullScreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement) {
    location.reload();
  }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.key === 'F12' || (event.ctrlKey && (event.key === 'I' || event.key === 'J' || event.key === 'C' || event.key === 'U'))) {
      event.preventDefault();
  }
});

function devToolsOpen() {
  const element = new Image();
  Object.defineProperty(element, 'id', {
      get: function() {
          alert('Developer tools detected! Please close them.');
      }
  });
  
}

function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.querySelector('p').textContent = 'If You Exit The Full Screen Mode Then The Page Will Be Reloaded.';
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}



const editableDiv = document.getElementById('editable-div');

    // Make the div editable
    editableDiv.contentEditable = true;

    // Restrict cut, copy, paste, and right-click
    editableDiv.addEventListener('cut', (e) => e.preventDefault());
    editableDiv.addEventListener('copy', (e) => e.preventDefault());
    editableDiv.addEventListener('paste', (e) => e.preventDefault());
    editableDiv.addEventListener('contextmenu', (e) => e.preventDefault());

    // Dark-Light Mode
    function darkMode() {
      const navbar = document.querySelector('.navbar');
      const cards1 = document.querySelector('.card1');
      const cards2 = document.querySelector('.card2');
      const cards3 = document.querySelector('.card3');
      navbar.dataset.bsTheme = 'dark';
      cards1.dataset.bsTheme = 'dark';
      cards2.dataset.bsTheme = 'dark';
      cards3.dataset.bsTheme = 'dark';
      document.body.style.background = 'black';
    }

    function lightMode() {
      const navbar = document.querySelector('.navbar');
      const cards1 = document.querySelector('.card1');
      const cards2 = document.querySelector('.card2');
      const cards3 = document.querySelector('.card3');
      navbar.dataset.bsTheme = 'light';
      cards1.dataset.bsTheme = 'light';
      cards2.dataset.bsTheme = 'light';
      cards3.dataset.bsTheme = 'light';
      document.body.style.background = 'white';
    }


let string_='';

function genTextEasy(){
  showPopup();
  enterFullScreen();
  const text1=`Sohan Karfa @MASK`
string_=text1;  
document.getElementById('showText').innerHTML=string_;
}

function genTextMedium(){
  
  showPopup();
  enterFullScreen();
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789";
  let result = "";
  while(result.length<1000){
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
    }
  }
  string_=result;
  document.getElementById('showText').innerHTML=string_; 
  
}

function genTextHard(){
  showPopup();
  enterFullScreen();
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%^&*()_+}{,.';[]:?><~/*+";
  let result = "";
  while(result.length<1000){
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
    }
  }
  string_=result;
  document.getElementById('showText').innerHTML=string_; 
  
}

let startTime;
    let endTime;
    let timeDifference;

    const stopButton = document.getElementById('checkText');

    function startTimer() {
        if (!startTime) {  // Only set startTime if it hasn't been set yet
            startTime = new Date();
        }
    }

    function stopTimer() {
        endTime = new Date();
        timeDifference = (endTime - startTime) / 1000;  // time difference in seconds
        
    }


    editableDiv.addEventListener('keydown', startTimer);

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


    function checkText() {
      stopTimer();
      const editableDiv = document.getElementById('editable-div');
      const typedText = editableDiv.textContent || editableDiv.innerText;
      const string1 = string_;
      const string2 = typedText;
      const dis=levenshteinDistance(string1,string2)
      const accuracy=typedText.length-dis
      const acc=Math.floor((accuracy/string_.length)*100)
      const speed=Math.ceil((accuracy/timeDifference))
      if(speed<0){
        speed=0;
      }
      if(acc<0){
        acc=0;
      }
      const cardBody = document.querySelector('.card.card3 .card-body');
      cardBody.innerHTML = 'Speed (including accuracy): '+speed+' characters per second<br><br>Accuracy: '+acc+' percent'

  }
 

  function DetailsshowPopup() {
    const popup = document.getElementById('Detailspopup');
  popup.querySelector('p').innerHTML = `Developed by @MASK<br><br>Tech Stack: HTML, JavaScript, CSS, Bootstrap<br>Algoritm: Levenshtein Distance<br><br>Developer: Sohan Karfa<br>Email: sohan100karfa@gmail.com<br><br>Working: It measures
  the Levenshtein Distance between the given and typed string to calculate number of dissimilarities and calculate the accuracy and speed`;
  popup.style.display = 'flex';
}

function DetailsclosePopup() {
    const popup = document.getElementById('Detailspopup');
    popup.style.display = 'none';
}
    

