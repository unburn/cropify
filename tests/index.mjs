import { cropImage } from "../dist/index.mjs";
import fs from "fs";

const image = 'https://th.bing.com/th/id/OIGP.914kwCtAqWQ7Lkx5hT2B?pid=ImgGn';

const cropX = 0;
const cropY = 0;
const cropWidth = 1280;
const cropHeight = 720;
const borderRadius = 80;

cropImage({
    imagePath: image,
    x: cropX,
    y: cropY,
    width: cropWidth,
    height: cropHeight,
    borderRadius: borderRadius,
    cropCenter: true
}).then(x => {
    console.log("Image has been cropped.")
    fs.writeFileSync("cropped-image.png", x);
});
