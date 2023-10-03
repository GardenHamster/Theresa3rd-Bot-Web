
const getFaceHttpUrl = function (path: string): string {
    if (!path.startsWith('/')) path = `/${path}`;
    if (window.baseURL) return window.baseURL + path;
    const fullPath = window.document.location.href;
    const subPath = window.document.location.pathname;
    const index = fullPath.indexOf(subPath);
    const hostPath = fullPath.substring(0, index);
    return (hostPath + path);
}

export default getFaceHttpUrl;