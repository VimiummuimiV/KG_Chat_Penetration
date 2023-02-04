// Fields
let gameRoomField = document.querySelector('div[id*="chat-game"] input.text');
let generalRoomField = document.querySelector('#chat-general input.text');
// Buttons
let gameRoomButton = document.querySelector('div[id*="chat-game"] input.send');
let generalRoomButton = document.querySelector('#chat-general input.send');

let asciiImagesRawData;
let asciiImagesSeparation;
let asciiImages;

function removeFirstMessage() {
  let messagesContainer = document.querySelector(".messages-content div");
  let firstChild = messagesContainer.firstElementChild;
  if (firstChild) {
    messagesContainer.removeChild(firstChild);
  }
}

async function getAsciiImages() {
  var url = 'https://raw.githubusercontent.com/VimiummuimiV/Chat-Penetration/main/ascii-images.txt';
  var response = await fetch(url);
  var data = await response.text();
  asciiImagesRawData = data.split("!@#$");
  asciiImagesSeparation = asciiImagesRawData.map(image => image.split("\r\n"));
  asciiImages = asciiImagesSeparation.reduce((acc, image, index) => {
    let count = index + 1;
    acc["image" + count] = image;
    return acc;
  }, {});

  executePosting();
}
getAsciiImages();

const executePosting = () => {

  let timer = 1000;

  const randomImage = () => {
    const imageKeys = Object.keys(asciiImages);
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    const randomKey = imageKeys[randomIndex];
    return asciiImages[randomKey];
  };

  const shownImages = new Set();

  const displayImage = () => {
    let image = randomImage();
    while (shownImages.has(image)) {
      image = randomImage();
    }
    shownImages.clear();
    shownImages.add(image);

    let i = 0;
    const sendLine = () => {
      generalRoomField.value = image[i];
      generalRoomButton.click();
      removeFirstMessage();
      i++;
      if (i < image.length) {
        setTimeout(sendLine, timer);
      } else {
        setTimeout(() => {
          generalRoomField.value = "...";
          generalRoomButton.click();
          removeFirstMessage();
          setTimeout(displayImage, timer);
        }, timer);
      }
    };
    sendLine();
  };

  displayImage();
};
