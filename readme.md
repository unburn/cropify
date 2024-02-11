## About
**Cropify** helps to crop and round image corners seamlessly.

## Features
- Crop images with precision using the Canvas API.
- Optional support for rounding corners with a customizable border radius.
- Designed for simplicity and performance.
- Upscale and cover image.

## Installation
```
npm install cropify
```

## Usage
```javascript
const { cropImage } = require("cropify");
const fs = require("fs")

const imagePath = 'https://storage.googleapis.com/pai-images/8c27ed6e3c85463a8db958ecb596594e.jpeg';

const cropX = 0;
const cropY = 0;
const cropWidth = 1280;
const cropHeight = 720;
const borderRadius = 80;

cropImage({
    imagePath: imagePath,
    x: cropX,
    y: cropY,
    width: cropWidth,
    height: cropHeight,
    borderRadius: borderRadius
}).then(x => {
    fs.writeFileSync("cropped-image.png", x);
});
```

## Output
![example](./assets/example.png)

---
If you need help or want some features to be added, join our official [discord](https://discord.com/invite/qDysF95NWh) community.