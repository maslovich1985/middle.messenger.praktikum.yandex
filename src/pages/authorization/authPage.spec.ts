import { AuthorizationPage } from './authorization';
import { registerComponent } from '../../common/registerComponent';
import Input from '../../components/Input';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const chai = require('chai');
chai.use(require('chai-dom'));

describe('Тест компонента AuthorizationPage', () => {
  registerComponent(Button, 'Button');
  registerComponent(Input, 'Input');
  registerComponent(InputField, 'InputField');

  const authPage = new AuthorizationPage();

  it('Компонент имеет класс form-container', () => {
    chai.expect(authPage.getContent()).to.have.class('form-container');
  });

  it('Компонент содержит элемент h2 с названием "Авторизация"', () => {
    chai.expect(authPage.getContent()?.querySelector('h2')).to.have.text('Авторизация');
  });

  it('Компонент содержит элемент form с классом authorisation-form__form', () => {
    chai.expect(authPage.getContent()?.querySelector('form')).to.have.class('authorisation-form__form');
  });

  it('На форме имеется 2 элемента input', () => {
    chai.expect(authPage.getContent()?.querySelectorAll('input')).to.have.length(2);
  });

  it('На форме имеется 2 элемента label c текстами "Логин:" и "Пароль:"', () => {
    chai.expect(authPage.getContent()?.querySelectorAll('label')).to.have.text(['Логин:', 'Пароль:']);
  });

  it('На форме имеется 1 элемент button c текстом "Авторизация:"', () => {
    chai.expect(authPage.getContent()?.querySelectorAll('button')).to.have.text(['\n        Авторизация\n      ']);
  });
});
