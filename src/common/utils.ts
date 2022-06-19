interface IValidationInput {
  elementId: string;
  regexp: string;
}

interface IInputsValidationResults {
  inputName: string;
  inputValue: string;
  validationOK: boolean;
}

/**
 * Делает валидацию инпута, устанавливая соответствующие классы,
 * при успешной валидации возвращает объект с полями inputName, inputValue и validationOK
 * @param elementId - id инпута
 * @param regexp - регулярное выражение для проверки значения инпута
 * */
export const validateInput = (elementId: string, regexp: RegExp | string): IInputsValidationResults => {
  const input = document.getElementById(elementId) as HTMLInputElement;
  const reg = new RegExp(regexp);
  const validationOK = reg.test(input.value);

  if (validationOK) {
    input.classList.remove('input-error');
    input.classList.add('input-normal');
  } else {
    input.classList.remove('input-normal');
    input.classList.add('input-error');
  }

  return {
    validationOK,
    inputName: input.name,
    inputValue: input.value,
  };
};

/**
 * Делает валидацию инпутов, устанавливая соответствующие классы,
 * при успешной прохождении валидации всех инпутов выводит объект в консоль.
 * @param items - параметры IValidateInput
 * */
export const validateInputs = (...items: IValidationInput[]) => {
  const inputsValidationResults = items.map((item) => validateInput(item.elementId, item.regexp));

  if (inputsValidationResults.every((item) => item.validationOK)) {
    // eslint-disable-next-line no-console
    return inputsValidationResults.reduce((acc, cur) => Object.assign(acc, { [cur.inputName]: cur.inputValue }), {});
  }

  return undefined;
};

export const getParentDataSetParam = (element: HTMLElement, className: string, dataSetParam: string): string | undefined => {
  let copyElement = element;

  while (copyElement.className !== className) {
    if (copyElement.parentElement !== null) {
      copyElement = copyElement.parentElement;
    } else {
      return undefined;
    }
  }

  return copyElement.dataset[dataSetParam];
};

export const scrollToLastMessage = () => {
  setTimeout(() => {
    const collection = document.getElementsByClassName('messages-container');
    if (collection.length) {
      collection[0].scrollTo({
        top: collection[0].scrollHeight,
        behavior: 'smooth',
      });
    }
  }, 200);
};
