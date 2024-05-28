import { createCanvas, loadImage } from "@napi-rs/canvas"

interface optionType {
    imagePath: Parameters<typeof loadImage>[0],
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    borderRadius?: number,
    circle?: boolean,
    cropCenter?: boolean
}

const cropImage = async (option: optionType) => {
    try {
        const image = await loadImage(option.imagePath);

        if (!option.width) option.width = image.width;
        if (!option.height) option.height = image.height;
        if (!option.x) option.x = 0
        if (!option.y) option.y = 0

        const scaleWidth = option.width / image.width;
        const scaleHeight = option.height / image.height;
        const scaleFactor = Math.max(scaleWidth, scaleHeight);

        const scaledWidth = image.width * scaleFactor;
        const scaledHeight = image.height * scaleFactor;

        if (option.cropCenter) {
            option.x = (option.width - scaledWidth) / 2;
            option.y = (option.height - scaledHeight) / 2;
        } else {
            option.x -= (option.width - image.width * scaleFactor) / 2;
            option.y -= (option.height - image.height * scaleFactor) / 2;
        }

        const canvas = createCanvas(option.width, option.height);
        const ctx = canvas.getContext('2d');

        if (option.circle) {
            ctx.beginPath();
            ctx.arc(option.width / 2, option.height / 2, Math.min(option.width, option.height) / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
        } else if (option.borderRadius && option.borderRadius > 0) {
            ctx.beginPath();
            ctx.moveTo(option.borderRadius, 0);
            ctx.lineTo(option.width - option.borderRadius, 0);
            ctx.quadraticCurveTo(option.width, 0, option.width, option.borderRadius);
            ctx.lineTo(option.width, option.height - option.borderRadius);
            ctx.quadraticCurveTo(option.width, option.height, option.width - option.borderRadius, option.height);
            ctx.lineTo(option.borderRadius, option.height);
            ctx.quadraticCurveTo(0, option.height, 0, option.height - option.borderRadius);
            ctx.lineTo(0, option.borderRadius);
            ctx.quadraticCurveTo(0, 0, option.borderRadius, 0);
            ctx.closePath();
            ctx.clip();
        }
        ctx.drawImage(image, option.x, option.y, scaledWidth, scaledHeight);

        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message)
    }
}

export { cropImage }