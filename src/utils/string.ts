export const padLeft = (content: string, value: string, length: number): string => {
    content = content ?? '';
    value = value ?? '';
    for (let i = 0; i < length - content.length; i += 1) {
        content = value + content;
    }
    return content;
}

export default { padLeft }