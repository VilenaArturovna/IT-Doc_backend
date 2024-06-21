import { HtmlPdfService } from './html-to-pdf.adapter';

const htmlToPdfServiceSingleton = new HtmlPdfService();

export const htmlToPdfSingletonProvider = {
  provide: HtmlPdfService,
  useFactory: () => htmlToPdfServiceSingleton,
};
