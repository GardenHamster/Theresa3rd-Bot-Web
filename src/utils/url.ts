const appendUrl = function (baseUrl: string, imgPath: string): string {
    baseUrl = baseUrl?.trim() ?? '';
    imgPath = imgPath?.trim() ?? '';
    baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    imgPath = imgPath.startsWith('/') ? imgPath.substring(1) : imgPath;
    return `${baseUrl}/${imgPath}`;
}

const getFaceHttpUrl = function (path: string): string {
    const baseUrl = window.baseURL;
    if (baseUrl && baseUrl.trim().length > 0) {
        return appendUrl(baseUrl, path);
    }
    const fullPath = window.document.location.href;
    const subPath = window.document.location.pathname;
    const index = fullPath.indexOf(subPath);
    const hostPath = fullPath.substring(0, index);
    return appendUrl(hostPath, path);
}

export { appendUrl, getFaceHttpUrl }