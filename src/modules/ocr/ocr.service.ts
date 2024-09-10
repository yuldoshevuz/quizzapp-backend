import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
    async processImage(imagePath: string, language: string) {
        return new Promise<string>(async (resolve, reject) => {
            const result = await Tesseract.recognize(imagePath, language, {
                errorHandler: () => reject('Invalid language! Please submit the correct language format')
            });

            resolve(result.data.text);
        });
    }
}