import { DocumentFormInput } from '../../../../interfaces/FormInputs/Document';
import { SingleDocumentFieldProps } from '../Document.types';

export interface DocumentFieldAccordionProps extends SingleDocumentFieldProps {
  documents: DocumentFormInput[];
}
