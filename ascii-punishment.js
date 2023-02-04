let textField = document.querySelector('.text');
let sendButton = document.querySelector('.send');

let asciiImagesRawData;
let asciiImagesSeparation;
let asciiImages;

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
  let timer = 200;

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
      textField.value = image[i];
      sendButton.click();
      i++;
      if (i < image.length) {
        setTimeout(sendLine, timer);
      } else {
        setTimeout(() => {
          textField.value = "...";
          sendButton.click();
          setTimeout(displayImage, timer);
        }, timer);
      }
    };
    sendLine();
  };

  displayImage();
};
