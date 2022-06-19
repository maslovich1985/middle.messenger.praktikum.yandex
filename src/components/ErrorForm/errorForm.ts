import Block from '../../common/Block';
import './errorForm.less';

interface IButtonProps {
  errorNumber: number;
  errorPicturePath: string;
}

export class ErrorForm extends Block<IButtonProps> {
  constructor({ errorNumber, errorPicturePath }: IButtonProps) {
    super({
      errorNumber,
      errorPicturePath,
    });
  }

  render() {
    // language=hbs
    return `
        <div class="page-container">
            <div class="error-container">
                <img class="error-container__image" src="https://auho.ru/sites/default/files/3_745.jpg" alt="error-picture" />
                <p class="error-text">
                    Ошибка <b>{{errorNumber}}</b>. Уже чиним! ;)
                </p>
            </div>
        </div>
    `;
  }
}
