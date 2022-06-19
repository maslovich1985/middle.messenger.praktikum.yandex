import Block from '../../common/Block';
import '../../common/styles/styles.less';
import { WithRouterProps } from '../../common/withRouter';

export interface ILinkProps extends WithRouterProps {
  to: string;
  text: string;
}

export class Link extends Block<ILinkProps> {
  constructor({
    to, text, router,
  }: ILinkProps) {
    super({
      to,
      text,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          router.go(to);
        },
      },
    });
  }

  protected render() {
    // language=hbs
    return '<a class="base-link" href="{{ to }}">{{ text }}</a>';
  }
}
