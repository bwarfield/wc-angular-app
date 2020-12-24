import { ToWords } from 'node_modules/to-words/dist/to-words';


export class UtilService {
  convertNumberToText(x: number): string{
    const toWords = new ToWords({
      localeCode: 'en-US',
      converterOptions: {
        currency: false,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
      }
    });

    return toWords.convert(x);
  }
}
