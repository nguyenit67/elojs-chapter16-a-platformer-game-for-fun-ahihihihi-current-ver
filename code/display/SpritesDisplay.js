import {DOMDisplay} from "./DOMDisplay";


function imgToEz(img /* :Image */) {
  const {width, height} = img;

  function imgToFlatArray(img /* :Image */) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let imgData = ctx.getImageData(0, 0, width, height);
    let flatArr = imgData.data;
    return flatArr;
  }

  let flatArr = imgToFlatArray(img);
  let slicedArr = flatArr.slice(0, flatArr.length / 4);

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let slicedImgData = new ImageData(slicedArr, width);
  ctx.putImageData(slicedImgData, 0, 0);
  canvas.toDataURL("image/png");

}

