import { List } from 'linqts';
import { FacePath } from '@/store/modules/path/types';

export enum PreviewType {
    Text = 1,
    Image = 2,
}

export interface PreviewText {
    text: string;
}

export interface PreviewImage {
    path: string;
}

export interface PreviewContent {
    type: PreviewType;
    value: PreviewText | PreviewImage;
}

const createText = (text: string): PreviewContent => {
    const value: PreviewText = { text };
    const content: PreviewContent = { type: PreviewType.Text, value };
    return content;
}

const createImage = async (facePaths: FacePath[], path: string): Promise<PreviewContent> => {
    const serverPath = path.replace('[image:', '').replace(']', '').trim();
    const httpPath = new List<FacePath>(facePaths).Where(o => o?.serverPath === serverPath).FirstOrDefault()?.httpPath;
    const value: PreviewImage = { path: httpPath };
    const content: PreviewContent = { type: PreviewType.Image, value };
    return content;
}

const splitNewLine = (template: string): PreviewContent[] => {
    if (!template) return [];
    if (template.trim().length === 0) return [];
    const strArr = template.trim().split('\n');
    const contents: PreviewContent[] = [];
    for (let index = 0; index < strArr.length; index += 1) {
        const content = createText(strArr[index]);
        contents.push(content);
    }
    return contents;
}

const splitImgCode = async (facePaths: FacePath[], str: string): Promise<PreviewContent[]> => {
    let textString = str;
    const imgReg = /\[image:[^\[\]]+?\]/igm;
    const array = str.match(imgReg) as string[] ?? [];
    const contents: PreviewContent[] = [];
    for (let i = 0; i < array.length; i += 1) {
        const element = array[i] as string;
        const index = textString.indexOf(element);
        const textStr = textString.substring(0, index)
        if (textStr.length > 0) contents.push(createText(textStr));
        const imgStr = textString.substring(index, index + element.length);
        if (imgStr.length > 0) contents.push(await createImage(facePaths, imgStr));
        textString = textString.substring(index + element.length);
    }
    if (textString.length > 0) {
        contents.push(createText(textString));
    }
    return contents;
}

const splitImgCodes = async (facePaths: FacePath[], contents: PreviewContent[]): Promise<PreviewContent[]> => {
    const newContents: PreviewContent[] = [];
    for (let index = 0; index < contents.length; index += 1) {
        const content = contents[index];
        if (content.type === PreviewType.Text) {
            const textValue = content.value as PreviewText;
            const splitContents = await splitImgCode(facePaths, textValue.text);
            newContents.push(...splitContents);
        }
        else {
            newContents.push(content);
        }
    }
    return newContents;
}

export const analysis = async (facePaths: FacePath[], template: string): Promise<PreviewContent[]> => {
    let contents: PreviewContent[] = [];
    contents = splitNewLine(template);
    console.log('contents', contents);
    contents = await splitImgCodes(facePaths, contents);
    console.log('contents', contents);
    return contents;
}



