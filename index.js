const { createCanvas, loadImage } = require('@napi-rs/canvas');

async function cropImage({
    imagePath,
    x,
    y,
    width,
    height,
    borderRadius = 0
}) {
    try {
        const image = await loadImage(imagePath);

        if (!width) width = image.width;
        if (!height) height = image.height;

        const scaleWidth = width / image.width;
        const scaleHeight = height / image.height;
        const scaleFactor = Math.max(scaleWidth, scaleHeight);

        const scaledWidth = image.width * scaleFactor;
        const scaledHeight = image.height * scaleFactor;

        x = (width - scaledWidth) / 2;
        y = (height - scaledHeight) / 2;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        if (borderRadius > 0) {
            ctx.beginPath();
            ctx.moveTo(borderRadius, 0);
            ctx.lineTo(width - borderRadius, 0);
            ctx.quadraticCurveTo(width, 0, width, borderRadius);
            ctx.lineTo(width, height - borderRadius);
            ctx.quadraticCurveTo(width, height, width - borderRadius, height);
            ctx.lineTo(borderRadius, height);
            ctx.quadraticCurveTo(0, height, 0, height - borderRadius);
            ctx.lineTo(0, borderRadius);
            ctx.quadraticCurveTo(0, 0, borderRadius, 0);
            ctx.closePath();
            ctx.clip();
        }

        ctx.drawImage(image, x, y, scaledWidth, scaledHeight);

        return canvas.toBuffer("image/png");
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { cropImage };
