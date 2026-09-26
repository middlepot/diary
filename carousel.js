    const imageURLs = [
      "../art/01.png",
      "../art/02.png",
      "../art/03.png",
      "../art/04.png",
      "../art/05.png",
      "../art/06.png",
      "../art/07.png",
      "../art/08.png",
      "../art/09.png",
      "../art/10.png",
      "../art/11.png",
      "../art/12.png",
      "../art/13.png",
      "../art/14.png",
      "../art/15.png",
      "../art/16.png",
      "../art/17.png",
      "../art/18.png"
    ];

    function displayRandomImage() {
      const randomIndex = Math.floor(Math.random() * imageURLs.length);
      const selectedImage = imageURLs[randomIndex];
      document.getElementById("randomImage").src = selectedImage;
    }

    document.addEventListener("DOMContentLoaded", displayRandomImage);