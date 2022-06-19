import { expect } from 'chai';
import { beforeEach } from 'mocha';
import Router from '../Router';
import { AuthorizationPage } from '../../pages/authorization/authorization';
import { RegistrationPage } from '../../pages/registration/registration';

const router = new Router();

describe('Проверяем Router.ts', () => {
  beforeEach(() => {
    router.use('/root', AuthorizationPage).use('/root/reg', RegistrationPage);
    router.start();
  });

  it('Начальная инициализация работает', () => {
    expect(window.location.pathname).to.eq('/');
  });

  it('Метод router.go работает', () => {
    router.go('/reg');
    expect(window.location.pathname).to.eq('/reg');
  });
});
