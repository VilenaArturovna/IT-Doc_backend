import { GetCertificateOfTechnicalConditionDaoModel } from '@modules/order/database/read-model';
import {
  HtmlToPdfPort,
  HtmlToPdfType,
} from '@src/common/services/html-pdf-service/html-to-pdf.port';
import * as dayjs from 'dayjs';
import { create, CreateOptions } from 'html-pdf';

export class HtmlPdfService implements HtmlToPdfPort {
  async createPdfBuffer(
    type: HtmlToPdfType,
    data: GetCertificateOfTechnicalConditionDaoModel,
  ): Promise<Buffer> {
    const options: CreateOptions = {
      format: 'A4',
      border: '20',
    };

    let html = '';

    if (type === 'technical-condition') {
      html = this.getHtmlBodyOfCertificateOfTechnicalCondition(data);
    }

    return new Promise<Buffer>((resolve, reject) => {
      create(html, options).toBuffer((err, buffer) => {
        if (err) reject(err);
        resolve(buffer);
      });
    });
  }

  private getHtmlBodyOfCertificateOfTechnicalCondition(
    data: GetCertificateOfTechnicalConditionDaoModel,
  ) {
    const works = data.works?.length
      ? `<div>
        необходимо провести следующие работы:
      </div>` + data.works.map((w) => `<div>- ${w}</div>`).join('')
      : '';

    return `
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <title>${data.number}</title>
          <style>
              body {
                  width: 95%;
                  margin-top: 15px;
                  font-family: 'Times New Roman', Times, serif;
              }
              .t-header {
                  width: 100%;
                  margin-bottom: 30px;
              }
              .t-header > th {
                  width: 50%;
              }
              .t-logo {
                  width: 100%;
              }
              .t-attributes {
                  line-height: 1.6;
                  font-style: italic;
                  color: dimgray;
                  text-align: end;
                  font-size: 0.8rem;
                  font-weight: normal;
              }
              .number {
                  border-bottom: 1px solid dimgray;
                  margin-bottom: 30px;
                  font-size: 0.6rem;
                  font-style: italic;
                  line-height: 1.6;
                  width: 30%;
              }
              .body {
                  margin-bottom: 20px;
                  font-size: 0.8rem;
                  line-height: 1.6;
                  text-align: justify;
                  padding-left: 10px;
              }
              .title {
                  font-weight: bold;
                  text-align: center;
                  margin-bottom: 10px;
              }
              .staff {
                  font-weight: bold;
                  font-size: 0.8rem;
                  width: 80%;
                  margin-left: 10%;
              }
              .one-staff {
                  line-height: 5rem;
              }
              .th {
                  text-align: left;
              }
          </style>
        </head>
        <body>
          <table class="t-header">
            <tr>
              <th>
                <img src="https://i.postimg.cc/wvc7S7Tq/logo.png" alt="logo" class="t-logo"/>
              </th>
              <th>
                <div class="t-attributes">
                  <div>ООО «АйТи Док»</div>
                  <div>ИНН/КПП</div>
                  <div>5503193968/550301001</div>
                  <div>г. Омск, ул. Голика, 2, пом.1/20П</div>
                  <div>+7(3812)37-85-03</div>
                  <a href="info@itdoc55.ru">info@itdoc55.ru</a>
                </div>
              </th>
            </tr>
          </table>
      
          <div class="number">
            <div>Исх. &#8470; ________________/${dayjs().get('y')}</div>
            <div>дата: ${dayjs().format('DD/MM/YYYY')}</div>
          </div>
      
          <div class="body">
            <div class="title">Акт технического состояния</div>
            <div>
              ООО «АйТи Док» проведя диагностику технического состояния оборудования
            </div>
            <div>
              ${data.equipment} ${
      data.serialNumberEquipment
        ? ', s/&#8470; ' + data.serialNumberEquipment
        : ''
    }
            </div>
            <div>
              принадлежащего: ${data.client}
            </div>
            <div>
              выявило следующие неисправности:
            </div>
            <div>
              ${data.equipmentCondition}
            </div>
            ${works}
          </div>
        <table class="staff">
          <tbody>
          <tr class="one-staff">
            <th class="th"><span>Инженер сервисного центра</span></th>
            <th class="th"><span>${data.staff}</span></th>
          </tr>
          <tr class="one-staff">
            <th class="th">Руководитель сервисного центра</th>
            <th class="th">А.С. Сазанов</th>
          </tr>
          </tbody>
        </table>
        </body>
      </html>
    `;
  }
}
