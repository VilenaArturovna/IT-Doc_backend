import { UserName } from '../types';

export function getStaffCreatedTemplate(
  password: string,
  name: UserName,
  email: string,
): string {
  return `<div>
    Уважаемый ${name.firstname} ${name.lastname} <br/>
    На сайте <a href="${email}">IT-Doc</a> была создана учетная запись<br/>
    Для входа используйте адрес электронной почты и указанный ниже пароль<br/>
    <b>${password}</b><br/>
    После входа, пожалуйста, смените пароль в личном кабинете
    </div>
  `;
}
