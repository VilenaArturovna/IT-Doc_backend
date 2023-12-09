import { UserName } from '../types';

export function getPasswordRecoveryTemplate(
  resetPasswordCode: string,
  name: UserName,
  href: string,
): string {
  return `
      Уважаемый ${name.firstname} ${name.lastname}<br/>
      Для сброса пароля перейдите, пожалуйста, по ссылке ниже<br/>
      <a href="${href}">Сбросить пароль</a><br/>      
      Пожалуйста, не обращайте внимания на это сообщение, если вы не инициировали запрос. Ваш пароль не будет изменен до тех пор, пока Вы не смените его на сайте, перейдя по ссылке    `;
}
