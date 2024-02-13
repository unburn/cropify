const { createCanvas, loadImage } = require('@napi-rs/canvas');

async function cropImage({
    imagePath,
    x = 0,
    y = 0,
    width,
    height,
    borderRadius = 0,
    circle = false
}) {
    try {
        const image = await loadImage(imagePath);

        if (!width) width = image.width;
        if (!height) height = image.height;

        // Calculate scale factors
        const scaleWidth = width / image.width;
        const scaleHeight = height / image.height;
        const scaleFactor = Math.max(scaleWidth, scaleHeight);

        // Adjust x and y before scaling
        x -= (width - image.width * scaleFactor) / 2;
        y -= (height - image.height * scaleFactor) / 2;

        // Scaled dimensions
        const scaledWidth = image.width * scaleFactor;
        const scaledHeight = image.height * scaleFactor;

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        if (circle) { // Crop image into a circle
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
        } else if (borderRadius > 0) { // Clip with border radius if provided
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

        // Draw image
        ctx.drawImage(image, x, y, scaledWidth, scaledHeight);

        return canvas.toDataURL("image/png")
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = { cropImage };