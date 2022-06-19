// import template from './button.hbs';
import Block from '../../common/Block';
import '../../common/styles/styles.less';

export type TInputType = 'email' | 'text' | 'tel' | 'password';

interface IInputField {
  labelText?: string;
  inputId: string;
  inputType: TInputType;
  inputName: string;
  inputValue?: string;
  inputPlaceholder?: string;
  regexp: string;
}

export class InputField extends Block<IInputField> {
  constructor(props: IInputField) {
    super({
      ...props,
    });
  }

  render() {
    const {
      labelText, inputId, inputType, inputName, inputValue, inputPlaceholder, regexp,
    } = this.props;

    // language=hbs
    return `
        <div>
            ${labelText ? '<label for={{inputName}} class="input-label">{{labelText}}</label>' : ''}
            {{{ Input inputId="${inputId}"
                      inputType="${inputType}"
                      inputName="${inputName}"
                      ${inputValue !== undefined ? `inputValue="${inputValue}"` : ''}
                      ${inputPlaceholder !== undefined ? `inputPlaceholder="${inputPlaceholder}"` : ''}
                      regexp="${regexp}"
            }}}
        </div>  
    `;
  }
}
