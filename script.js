const redSlider = document.getElementById("red-slider");
const greenSlider = document.getElementById("green-slider");
const blueSlider = document.getElementById("blue-slider");
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const hexcode = document.getElementById("hexcode");
const hue = document.getElementById("hue");
const saturation = document.getElementById("saturation");
const light = document.getElementById("light");
const colorpicker = document.getElementById("colorpicker");
const rgbcopy = document.getElementById("rgbcopy");
const hexcopy = document.getElementById("hexcopy");

let redValue = 207;
let greenValue = 0;
let blueValue = 0;

redSlider.addEventListener("input", () => {
  redValue = parseInt(redSlider.value);

  document.body.style.backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue})`;
  red.innerText = redValue;

  hexcode.innerText = rgbToHex(redValue, greenValue, blueValue);

  if (redValue + greenValue + blueValue / 3 <= 80) {
    document.body.style.color = "#fff";
  } else {
    document.body.style.color = "#000";
  }

  colorpicker.value = rgbToHex(redValue, greenValue, blueValue);
});

hexcopy.addEventListener("click", () => {
  copyTextToClipboard(rgbToHex(redValue, greenValue, blueValue));
});

rgbcopy.addEventListener("click", () => {
  copyTextToClipboard(`${redValue}, ${greenValue}, ${blueValue}`);
});

greenSlider.addEventListener("input", () => {
  greenValue = parseInt(greenSlider.value);

  document.body.style.backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue})`;
  green.innerText = greenValue;
  hexcode.innerText = rgbToHex(redValue, greenValue, blueValue);
  if (redValue + greenValue + blueValue / 3 <= 80) {
    document.body.style.color = "#fff";
  } else {
    document.body.style.color = "#000";
  }

  colorpicker.value = rgbToHex(redValue, greenValue, blueValue);
});

blueSlider.addEventListener("input", () => {
  blueValue = parseInt(blueSlider.value);

  document.body.style.backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue})`;
  blue.innerText = blueValue;
  hexcode.innerText = rgbToHex(redValue, greenValue, blueValue);
  if (redValue + greenValue + blueValue / 3 <= 80) {
    document.body.style.color = "#fff";
  } else {
    document.body.style.color = "#000";
  }

  colorpicker.value = rgbToHex(redValue, greenValue, blueValue);
});

colorpicker.addEventListener("input", () => {
  document.body.style.backgroundColor = colorpicker.value;
  let color = hexToRgb(colorpicker.value);
  red.innerText = color.r;
  green.innerText = color.g;
  blue.innerText = color.b;
  hexcode.innerText = colorpicker.value;
});

colorpicker.addEventListener("pointerenter", (e) => {
  let amts =  [-1.3, 1.3];
  let amt = amts[Math.floor(Math.random() * amts.length)];

  colorpicker.style.transform = `rotate(${amt}deg)`
});

colorpicker.addEventListener("pointerleave", () => {
  colorpicker.style.transform = "rotate(0deg)";
});

const hexToRgb = (hex) => {
  // turn hex val to RGB
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function rgbToHsv(r, g, b) {
  var computedH = 0;
  var computedS = 0;
  var computedV = 0;

  //remove spaces from input RGB values, convert to int
  var r = parseInt(("" + r).replace(/\s/g, ""), 10);
  var g = parseInt(("" + g).replace(/\s/g, ""), 10);
  var b = parseInt(("" + b).replace(/\s/g, ""), 10);

  if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {
    alert("Please enter numeric RGB values!");
    return;
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    alert("RGB values must be in the range 0 to 255.");
    return;
  }
  r = r / 255;
  g = g / 255;
  b = b / 255;
  var minRGB = Math.min(r, Math.min(g, b));
  var maxRGB = Math.max(r, Math.max(g, b));

  // Black-gray-white
  if (minRGB == maxRGB) {
    computedV = minRGB;
    return [0, 0, computedV];
  }

  // Colors other than black-gray-white:
  var d = r == minRGB ? g - b : b == minRGB ? r - g : b - r;
  var h = r == minRGB ? 3 : b == minRGB ? 1 : 5;
  computedH = 60 * (h - d / (maxRGB - minRGB));
  computedS = (maxRGB - minRGB) / maxRGB;
  computedV = maxRGB;
  return [computedH, computedS, computedV];
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
