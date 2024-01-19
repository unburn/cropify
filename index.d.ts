interface cropOption {
    imagePath: string,
    x: number,
    y: number,
    width: number,
    height: number,
    borderRadius?: number
}

declare function cropImage(options: cropOption): Promise<Buffer>;

export { cropImage }