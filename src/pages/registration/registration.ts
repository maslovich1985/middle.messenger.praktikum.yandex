import Block from '../../common/Block';
import './registration.less';
import { validateInputs } from '../../common/utils';
import {
  REGEXP_EMAIL, REGEXP_LOGIN, REGEXP_NAME, REGEXP_PASSWORD, REGEXP_PHONE,
} from '../../common/const';
import AuthController from '../../controllers/AuthController';
import { SignUpData } from '../../api/AuthAPI';
import Router from '../../common/Router';

export class RegistrationPage extends Block<{ onClick: Function }> {
  constructor() {
    super({
      onSignUp: () => this.onSignUp(),
    });
  }

  async onSignUp() {
    const data = validateInputs(
      { elementId: 'email-reg', regexp: REGEXP_EMAIL },
      { elementId: 'login-reg', regexp: REGEXP_LOGIN },
      { elementId: 'first_name-reg', regexp: REGEXP_NAME },
      { elementId: 'second_name-reg', regexp: REGEXP_NAME },
      { elementId: 'phone-reg', regexp: REGEXP_PHONE },
      { elementId: 'password-reg', regexp: REGEXP_PASSWORD },
    );

    // Если все поля заполнены и провалидированы - отправляем запрос
    if (data) {
      AuthController.signUp(data as SignUpData)
        .then(() => new Router().go('/messages'))
        .catch((error) => alert(`Ошибка выполнения запроса регистрации! ${error ? error.reason : ''}`));
    }
  }

  render() {
    // language=hbs
    return `
        <div class="form-container">
            <div class="registration-form">
                <h2 class="registration-form__title">Регистрация</h2>
                <form class="registration-form__form">
                    <div class="input-block">
                        {{{ InputField labelText="Почта:" inputId="email-reg" inputType="email" inputName="email" regexp="${REGEXP_EMAIL}" }}}
                        {{{ InputField labelText="Логин:" inputId="login-reg" inputType="text" inputName="login" regexp="${REGEXP_LOGIN}" }}}
                        {{{ InputField labelText="Имя:" inputId="first_name-reg" inputType="text" inputName="first_name" regexp="${REGEXP_NAME}" }}}
                        {{{ InputField labelText="Фамилия:" inputId="second_name-reg" inputType="text" inputName="second_name" regexp="${REGEXP_NAME}" }}}
                        {{{ InputField labelText="Телефон:" inputId="phone-reg" inputType="tel" inputName="phone" regexp="${REGEXP_PHONE}" }}}
                        {{{ InputField labelText="Пароль:" inputId="password-reg" inputType="password" inputName="password" regexp="${REGEXP_PASSWORD}" }}}
                    </div>
                    <div class="button-block">
                        {{{ Button buttonId="button-reg" label="Регистрация" onClick=onSignUp }}}
                    </div>
                </form>
            </div>
        </div>
    `;
  }
}
