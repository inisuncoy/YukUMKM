import path from "path";

export function createFilename(name, originalFilename) {
    const timestamp = Date.now();
    const fileExtension = path.extname(originalFilename);
    let sanitizedFilename = name.replaceAll(" ", "_");
    sanitizedFilename = name.replaceAll("-", "_");
    return `${sanitizedFilename}_${timestamp}${fileExtension}`;
}