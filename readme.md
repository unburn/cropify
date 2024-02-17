<img src="https://ik.imagekit.io/unburn/Cropify.svg"/>

<p align="center">Cropify helps to crop and round image corners seamlessly.</p>

<p align="center">
    <a href="https://github.com/unburn/cropify"><b>Github</b></a> •
    <a href="https://discord.gg/66uGX7t4ww"><b>Support</b></a>
</p>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/cropify?style=flat-square&color=%2300ADD3)](https://www.npmjs.com/package/cropify)
[![NPM Downloads](https://img.shields.io/npm/dw/cropify?style=flat-square&color=%2300ADD3)](https://www.npmjs.com/package/cropify)
[![NPM License](https://img.shields.io/npm/l/cropify?style=flat-square&color=%2300ADD3)](https://github.com/unburn/cropify/blob/main/LICENCE)
[![GitHub Repo stars](https://img.shields.io/github/stars/unburn/cropify?style=flat-square&color=%2300ADD3)](https://github.com/unburn/cropify)

</div>

<div align="center">
<a href="https://github.com/sponsors/flameface"><img src="https://ik.imagekit.io/unburn/SupportCropify.svg"/></a>
</div>

# Features
- Crop images with precision using the Canvas API.
- Optional support for rounding corners with a customizable border radius.
- Designed for simplicity and performance.
- Upscale and cover image.

# Installation
```
npm install cropify
```

# Usage
```javascript
const { cropImage } = require("cropify");
const fs = require("fs")

const imagePath = 'https://th.bing.com/th/id/OIGP.914kwCtAqWQ7Lkx5hT2B?pid=ImgGn';

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
    borderRadius: borderRadius,
    cropCenter: true
}).then(x => {
    fs.writeFileSync("cropped-image.png", x);
});
```

> **Note**: The image used in this example is generated using DALL-E

## Output
![example](https://ik.imagekit.io/unburn/CropifyExample.svg)

# Licence
[MIT](https://github.com/unburn/cropify/blob/main/LICENCE)