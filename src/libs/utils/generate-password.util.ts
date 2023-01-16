export const generatePassword = () => {
  const numbers = '0123456789';
  const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
  const largeLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = '!@#$%^&*()';

  let password = '';

  const array = [numbers, symbols, smallLetters, largeLetters];

  array.forEach((item) => {
    for (let i = 0; i <= 2; i++) {
      const randomNumber = Math.floor(Math.random() * item.length);
      password += item.substring(randomNumber, randomNumber + 1);
    }
  });

  const shuffle = (str) => [...str].sort(() => Math.random() - 0.5).join('');

  return shuffle(password);
};
