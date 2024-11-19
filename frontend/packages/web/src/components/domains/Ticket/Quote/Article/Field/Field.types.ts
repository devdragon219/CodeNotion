import { Control, FieldErrors } from 'react-hook-form';

import { ArticlesFieldValues } from '../Article.types';

export interface ArticleFieldProps {
  control: Control<ArticlesFieldValues>;
  errors: FieldErrors<ArticlesFieldValues>;
  index: number;
}
