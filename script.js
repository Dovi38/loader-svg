const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//to load 30 img takes a lot of time, need to improve

//unsplash API
let count = 5;
const apiKey = "5XOSD5b2eaenzLB3vBPqpMi1JgAG3okdOe9tWY4ikPQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

//Helper function to create attributes
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
//Create elements for links & photos, add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("totalImages=", totalImages);
  //Run function for each object in photos Array
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create image for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener,check when each finished loading
    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//Get photos from unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    //const data = await response.json(); static data
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
};
//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("window.innerHeight:", window.innerHeight);
    // console.log("window.scrollY:", window.scrollY);
    // console.log(
    //   "window.innerHeight + window.scrollY:",
    //   window.innerHeight + window.scrollY
    // );
    // console.log(
    //   "document.body.offsetHeight - 1000:",
    //   document.body.offsetHeight - 1000
    // );
    console.log("load more");
  }
});

//on load
getPhotos();
