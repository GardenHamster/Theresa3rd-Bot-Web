export const padLeft = (content: string, symbol: string, length: number): string => {
    if (!content) content = '';
    content = content.toString();
    if (!symbol) symbol = '';
    symbol = symbol.toString();
    for (let i = 0; i < length - content.length; i += 1) {
        content = symbol + content;
    }
    return content;
}

export default { padLeft }