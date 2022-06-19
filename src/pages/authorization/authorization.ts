import Block from '../../common/Block';
import './authorization.less';
import { validateInputs } from '../../common/utils';
import { REGEXP_LOGIN, REGEXP_PASSWORD } from '../../common/const';
import AuthController from '../../controllers/AuthController';
import { SignInData } from '../../api/AuthAPI';
import Router from '../../common/Router';
import ChatController from '../../controllers/ChatController';

export class AuthorizationPage extends Block<{ onClick: Function }> {
  constructor() {
    super({
      onClick: () => this.onSignIn(),
    });
  }

  componentDidMount() {
    AuthController.fetchUser().then(() => {
      const router = new Router();
      router.go('/messages');
    });
  }

  onSignIn() {
    const data = validateInputs({ elementId: 'login-auth', regexp: REGEXP_LOGIN }, { elementId: 'password-auth', regexp: REGEXP_PASSWORD });

    if (data) {
      AuthController.signIn(data as SignInData)
        .then(() => {
          console.log('Авторизация выполнена успешно!');
          ChatController.getChats();
          const router = new Router();
          router.go('/messages');
        })
        .catch((error) => alert(`Ошибка выполнения запроса авторизации! ${error ? error.reason : ''}`));
    }
  }

  render() {
    // language=hbs
    return `
      <div class="form-container">
        <div class="authorisation-form">
          <h2 class="authorisation-form__title">Авторизация</h2>
          <form class="authorisation-form__form">
            <div class="input-block">
              {{{ InputField labelText="Логин:" inputId="login-auth" inputType="text" inputName="login" regexp="${REGEXP_LOGIN}" }}}
              {{{ InputField labelText="Пароль:" inputId="password-auth" inputType="password" inputName="password" regexp="${REGEXP_PASSWORD}" }}}

              <nav class="nav-block">
                {{{ Link to="/signup" text="Регистрация" }}}
              </nav>
            </div>
            <div class="button-block">
              {{{ Button buttonId="button-auth" label="Авторизация" onClick=onClick }}}
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
