// ==UserScript==
// @name         KG_Ascii_Images_Poster
// @namespace    https://klavogonki.ru
// @version      0.1
// @description  Let's have some fun
// @author       Puncher
// @match        *://klavogonki.ru/g*
// @grant        none
// ==/UserScript==

(function () {

  // Object containing emoticons and their corresponding ASCII representation
  const emoticons = [
    ":smile:", ":biggrin:", ":angry:", ":angry2:", ":blink:", ":blush:", ":cool:", ":dry:",
    ":excl:", ":happy:", ":huh:", ":laugh:", ":mellow:", ":ohmy:", ":ph34r:", ":rolleyes:",
    ":sad:", ":sleep:", ":tongue:", ":unsure:", ":wacko:", ":wink:", ":wub:", ":power:",
    ":spiteful:", ":sorry:", ":first:", ":second:", ":third:", ":badcomp:", ":complaugh:",
    ":girlnotebook:", ":crazy:", ":boredom:", ":cry:", ":bye:", ":dance:", ":gamer:", ":rofl:",
    ":beer:", ":kidtruck:", ":boykiss:", ":girlkiss:", ":kissed:", ":yes:", ":no:", ":hi:", ":ok:"
  ];

  // Function to generate a string of random emoticons
  const generateEmoticonsString = (nEmoticonsPerLine) => {
    let emoticonsString = ""; // String to store generated emoticons
    for (let i = 0; i < nEmoticonsPerLine; i++) {
      const randomIndex = Math.floor(Math.random() * emoticons.length); // Get random emoticon index
      emoticonsString += emoticons[randomIndex] + " "; // Add emoticon to string
    }
    return emoticonsString.trim(); // Return generated string
  };

  function definePileOfPooButton() {

    // Select the messages wrapper element
    const pageBody = document.querySelector("body");

    // Create the pile of poo button element
    const pileOfPooButton = document.createElement("div");
    pileOfPooButton.innerHTML = "\uD83D\uDCA9"; // Assign Pile Of Poo Emoji
    pileOfPooButton.classList.add("pile-of-poo-button");

    // Define the default styles for the pile of poo button
    const defaultPileOfPooStyles = `
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 70px;
      right: 24px;
      width: 48px;
      height: 48px;
      border: none;
      outline: none;
      background-color: #9B870C;
      padding: 0;
      margin: 0;
      transition: background-color 0.3s;
    `;

    // Define the hover styles for the pile of poo button
    const hoverPileOfPooStyles = `
      background-color: #FFDD67;
      animation: shake 0.5s ease-in-out infinite;
    `;

    // Animated pile of poo button on hover
    const pileOfPooAnimation = document.createElement("style");

    pileOfPooAnimation.innerHTML = `
      @keyframes shake {
        0% { transform: translate(0.3px, 0.3px) rotate(0deg); }
        10% { transform: translate(-0.3px, -0.6px) rotate(-0.3deg); }
        20% { transform: translate(-0.9px, 0px) rotate(0.3deg); }
        30% { transform: translate(0.9px, 0.6px) rotate(0deg); }
        40% { transform: translate(0.3px, -0.3px) rotate(0.3deg); }
        50% { transform: translate(-0.3px, 0.6px) rotate(-0.3deg); }
        60% { transform: translate(-0.9px, 0.3px) rotate(0deg); }
        70% { transform: translate(0.9px, 0.3px) rotate(-0.3deg); }
        80% { transform: translate(-0.3px, -0.3px) rotate(0.3deg); }
        90% { transform: translate(0.3px, 0.6px) rotate(0deg); }
        100% { transform: translate(0.3px, -0.6px) rotate(-0.3deg); }
      }

    `;

    document.head.appendChild(pileOfPooAnimation);

    // Apply the default styles to the pile of poo button
    pileOfPooButton.style.cssText = defaultPileOfPooStyles;

    // Handle the mouseover event on the pile of poo button
    pileOfPooButton.addEventListener("mouseover", function () {
      pileOfPooButton.style.cssText = defaultPileOfPooStyles + hoverPileOfPooStyles;
    });

    // Handle the mouseout event on the pile of poo button
    pileOfPooButton.addEventListener("mouseout", function () {
      pileOfPooButton.style.cssText = defaultPileOfPooStyles;
    });

    // Append the pile of poo button to the messages wrapper
    pageBody.appendChild(pileOfPooButton);

    // Flag to keep track of the function execution status
    let AsciiBeastIsRunning = false;

    // Handle the pile of poo button click event
    pileOfPooButton.addEventListener("click", function () {
      // If the ASCII Beast is already running, keep the shake animation playing
      if (AsciiBeastIsRunning) { // Prevent multiple function executions
        alert("The ASCII Beast already running");
        return;
      }

      // Otherwise, set the ASCII Beast to running and start the shake animation
      AsciiBeastIsRunning = true; // Update the flag to indicate the function is running
      pileOfPooButton.innerHTML = '\uD83D\uDE48'; // Replace with Seen-No-Evil Monkey Emoji
      pileOfPooButton.style.animation = "rotate 1s linear infinite";
      pileOfPooButton.style.animationPlayState = "running";

      function unleashAsciiBeast() {

        // Variables to hold the ASCII images data
        let asciiImagesRawData;
        let asciiImagesSeparation;
        let asciiImages;

        // Async function to fetch the ASCII images data from a remote source
        async function getAsciiImages() {
          var url = 'https://raw.githubusercontent.com/VimiummuimiV/Chat-Penetration/main/ascii-pack-images.txt';
          var response = await fetch(url);
          var data = await response.text();
          asciiImagesRawData = data.split("--!@#$--");
          asciiImagesSeparation = asciiImagesRawData.map(image => image.split("\r\n"));
          asciiImages = asciiImagesSeparation.reduce((acc, image, index) => {
            let count = index + 1;
            acc["image" + count] = image;
            return acc;
          }, {});

          // Call the function to execute the posting of ASCII images
          executePosting();
        }
        // Call the function to get the ASCII images data
        getAsciiImages();

        // Function to execute the posting of ASCII images
        const executePosting = () => {
          // Timer for the delay between sending messages
          let timer = 500;

          // Function to select a random ASCII image
          const randomImage = () => {
            const imageKeys = Object.keys(asciiImages);
            const randomIndex = Math.floor(Math.random() * imageKeys.length);
            const randomKey = imageKeys[randomIndex];
            return asciiImages[randomKey];
          };

          // Set to store the shown ASCII images
          const shownImages = new Set();

          // Function to display a random ASCII image
          const displayImage = () => {
            let image = randomImage();

            // Ensure that the same image isn't displayed repeatedly
            while (shownImages.has(image)) {
              image = randomImage();
            }

            // Clear the set of shown images
            shownImages.clear();
            shownImages.add(image);

            let i = 0;

            // Get references to the input fields and buttons in the general and game chats
            let generalRoomField = document.querySelector('#chat-general input.text');
            let generalRoomButton = document.querySelector('#chat-general input.send');
            let gameRoomField = document.querySelector('div[id*="chat-game"] input.text');
            let gameRoomButton = document.querySelector('div[id*="chat-game"] input.send');

            // Function to send each line of the ASCII image to the appropriate chat room
            const sendLine = () => {
              let roomField, roomButton;

              // Determine which chat room we are currently in (general or Game)
              if (window.location.href.startsWith("https://klavogonki.ru/gamelist")) {
                roomField = generalRoomField;
                roomButton = generalRoomButton;
              } else if (window.location.href.startsWith("https://klavogonki.ru/g/?gmid=")) {
                roomField = gameRoomField;
                roomButton = gameRoomButton;
              }

              // Check if the field and button are not disabled
              if (roomField && !roomField.disabled && roomButton && !roomButton.disabled) {
                roomField.value = image[i];
                roomButton.click();
                removeOneMessage();
                i++;

                // If there are more lines of the ASCII image to be sent, call sendLine again after the timer
                if (i < image.length) {
                  setTimeout(sendLine, timer);
                } else {
                  setTimeout(() => {
                    // After all lines have been sent, send an emoticons separator line
                    roomField.value = generateEmoticonsString(28);
                    roomButton.click();
                    removeOneMessage();
                    setTimeout(displayImage, timer);
                  }, timer);
                }
              } else {
                console.log("You are banned");
              }
            };

            // Function to remove the first message in the chat
            function removeOneMessage() {
              let messagesContainer = document.querySelector(".messages-content div");
              let messagesCount = messagesContainer.childElementCount;
              if (messagesCount > 10) {
                let firstChild = messagesContainer.firstElementChild;
                messagesContainer.removeChild(firstChild);
              }
            }
            sendLine();
          };

          // Call the displayImage function
          displayImage();
        };

      }
      unleashAsciiBeast(); // Invoke the unleashAsciiBeast function
    });

  };

  definePileOfPooButton();

})();