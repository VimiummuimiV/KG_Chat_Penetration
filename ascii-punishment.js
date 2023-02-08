// ==UserScript==
// @name         KG_Ascii_Images_Poster
// @namespace    https://klavogonki.ru
// @version      0.1
// @description  Let's have some fun
// @author       Puncher
// @match        https://klavogonki.ru/g*
// @grant        none
// ==/UserScript==

(function () {
  // Fields to hold references to the input fields in the game and general rooms
  let gameRoomField = document.querySelector('div[id*="chat-game"] input.text');
  let generalRoomField = document.querySelector('#chat-General input.text');
  // Buttons to hold references to the send buttons in the game and general rooms
  let gameRoomButton = document.querySelector('div[id*="chat-game"] input.send');
  let generalRoomButton = document.querySelector('#chat-General input.send');

  // Variables to hold the ASCII images data
  let asciiImagesRawData;
  let asciiImagesSeparation;
  let asciiImages;

  // Function to remove the first message in the chat
  function removeOneMessage() {
    let messagesContainer = document.querySelector(".messages-content div");
    let messagesCount = messagesContainer.childElementCount;
    if (messagesCount > 1) {
      let firstChild = messagesContainer.firstElementChild;
      messagesContainer.removeChild(firstChild);
    }
  }

  // Async function to fetch the ASCII images data from a remote source
  async function getAsciiImages() {
    var url = 'https://raw.githubusercontent.com/VimiummuimiV/Chat-Penetration/main/ascii-images.txt';
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
    let timer = 1500;

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

      // Function to send each line of the ASCII image to the general room
      const sendLine = () => {
        generalRoomField.value = image[i];
        generalRoomButton.click();
        removeOneMessage();
        i++;

        // If there are more lines of the ASCII image to be sent, call sendLine again after the timer
        if (i < image.length) {
          setTimeout(sendLine, timer);
        } else {
          setTimeout(() => {
            let separator = "-";
            generalRoomField.value = separator.repeat(100);
            generalRoomButton.click();
            removeOneMessage();
            setTimeout(displayImage, timer);
          }, timer);
        }
      };
      sendLine();
    };

    // Call the displayImage function
    displayImage();
  };

})();