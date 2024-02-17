interface cropOption {
    imagePath: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    borderRadius?: number,
    circle?: boolean,
    cropCenter?: boolean
}

export declare function cropImage(options: cropOption): Promise<Buffer>;