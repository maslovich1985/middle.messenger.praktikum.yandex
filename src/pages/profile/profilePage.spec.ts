import { registerComponent } from '../../common/registerComponent';
import Input from '../../components/Input';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { ProfilePage } from './profile';

const chai = require('chai');
chai.use(require('chai-dom'));

describe('Тест компонента ProfilePage', () => {
  registerComponent(Button, 'Button');
  registerComponent(Input, 'Input');
  registerComponent(InputField, 'InputField');

  const profilePage = new ProfilePage({
    email: 'email@email.com',
  });

  it('Пропс email передается в компонент ProfilePage и отображается в компоненте input email', () => {
    chai.expect(profilePage.getContent()?.querySelector('input')?.value).to.equal('email@email.com');
  });

  it('Компонент имеет класс page-container', () => {
    chai.expect(profilePage.getContent()).to.have.class('page-container');
  });

  it('Компонент содержит элемент h2 с названием "Настройки"', () => {
    chai.expect(profilePage.getContent()?.querySelector('h2')).to.have.text('Настройки');
  });

  it('Компонент содержит элемент form с классом profile-form__form', () => {
    chai.expect(profilePage.getContent()?.querySelector('form')).to.have.class('profile-form__form');
  });

  it('На форме имеется 7 элементов input', () => {
    chai.expect(profilePage.getContent()?.querySelectorAll('input')).to.have.length(7);
  });

  it('На форме имеется 6 элементов label c текстами "Почта", "Логин:", "Имя", "Фамилия", "Никнэйм", "Телефон:"', () => {
    chai.expect(profilePage.getContent()?.querySelectorAll('label')).to.have.text(['Почта:', 'Логин:', 'Имя:', 'Фамилия:', 'Никнэйм:', 'Телефон:']);
  });

  it('На форме имеется 1 элемент button c текстами "Сохранить:"', () => {
    chai.expect(profilePage.getContent()?.querySelector('button')).to.have.text('\n        Сохранить\n      ');
  });
});
