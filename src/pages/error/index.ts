import { renderDom } from '../../common/renderDom';
import ErrorForm from '../../components/ErrorForm';

export const errorPage = new ErrorForm({
  errorNumber: 500,
  errorPicturePath: 'https://auho.ru/sites/default/files/3_745.jpg',
});

renderDom('#app', errorPage);
