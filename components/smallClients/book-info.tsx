import classNames from 'classnames';

import { subtitle, title } from '../primitives';

interface BookInfoProps {
  title: string;
  description?: string;
}

export default function BookInfo(book: BookInfoProps) {
  return (
    <div>
      <div className="flex gap-5 items-center">
        <h2 className={title()}>{book.title ?? 'Sem título'}</h2>
      </div>

      <div className="flex gap-5 items-center">
        <p className={classNames(subtitle(), 'max-w-[900px]')}>{book.description ?? 'Sem descrição'}</p>
      </div>
    </div>
  );
}
