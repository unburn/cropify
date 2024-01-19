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

        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

        return canvas.toBuffer('image/png');
    } catch (error) {
        console.error('Error cropping image:', error.message);
    }
}

module.exports = { cropImage };