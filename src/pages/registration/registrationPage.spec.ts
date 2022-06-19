import { registerComponent } from '../../common/registerComponent';
import Input from '../../components/Input';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { RegistrationPage } from './registration';

const chai = require('chai');
chai.use(require('chai-dom'));

describe('Тест компонента RegistrationPage', () => {
  registerComponent(Button, 'Button');
  registerComponent(Input, 'Input');
  registerComponent(InputField, 'InputField');

  const registrationPage = new RegistrationPage();

  it('Компонент имеет класс form-container', () => {
    chai.expect(registrationPage.getContent()).to.have.class('form-container');
  });

  it('Компонент содержит элемент h2 с названием "Регистрация"', () => {
    chai.expect(registrationPage.getContent()?.querySelector('h2')).to.have.text('Регистрация');
  });

  it('Компонент содержит элемент form с классом registration-form__form', () => {
    chai.expect(registrationPage.getContent()?.querySelector('form')).to.have.class('registration-form__form');
  });

  it('На форме имеется 6 элементов input', () => {
    chai.expect(registrationPage.getContent()?.querySelectorAll('input')).to.have.length(6);
  });

  it('На форме имеется 6 элементов label c текстами "Почта", "Логин:", "Имя", "Фамилия", "Телефон", "Пароль:"', () => {
    chai.expect(registrationPage.getContent()?.querySelectorAll('label')).to.have.text(['Почта:', 'Логин:', 'Имя:', 'Фамилия:', 'Телефон:', 'Пароль:']);
  });

  it('На форме имеется 1 элемента button c текстом "Регистрация:"', () => {
    chai.expect(registrationPage.getContent()?.querySelectorAll('button')).to.have.text(['\n        Регистрация\n      ']);
  });
});
