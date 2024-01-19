## About
**Cropify** helps to crop and round image corners seamlessly.

## Features
- Crop images with precision using the Canvas API.
- Optional support for rounding corners with a customizable border radius.
- Designed for simplicity and performance.

## Installation
```
npm install cropify
```

## Usage
```javascript
const { cropImage } = require("./index");
const fs = require("fs")

const imagePath = 'https://raw.githubusercontent.com/unburn/.github/main/assets/unburngithub.png';

const cropX = 600;
const cropY = 0;
const cropWidth = 722;
const cropHeight = 422;
const borderRadius = 20;

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
### Original

![original](https://raw.githubusercontent.com/unburn/.github/main/assets/unburngithub.png)

### Cropped

![crop](https://raw.githubusercontent.com/unburn/.github/main/assets/cropped-image.png)

---
If you need help or want some features to be added, join our official [discord](https://discord.com/invite/qDysF95NWh) community.