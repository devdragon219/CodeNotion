import { Grid2 } from '@mui/material';
import { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_MAX_FILE_SIZE } from '../../../configs/defaults';
import { ContentCategoryGroup } from '../../../enums/ContentCategory';
import { DocumentFieldConfig } from '../../../interfaces/DocumentField';
import { DocumentFormInput } from '../../../interfaces/FormInputs/Document';
import { getContentCategoryOptions } from '../../../utils/documentField/contentCategoryUtils';
import { getDocumentFieldDefaultLabel } from '../../../utils/documentField/documentFieldUtils';
import { DateField } from '../Date/Date';
import { DocumentUploadField } from '../DocumentUpload/DocumentUpload';
import { SelectField } from '../Select/Select';
import { TextField } from '../Text/Text';
import { DocumentFieldProps } from './Document.types';
import { DocumentFieldTable } from './Table/Table';

const DocumentField = forwardRef<HTMLDivElement, DocumentFieldProps>(
  (
    {
      contentCategoryGroupOptions = [ContentCategoryGroup.Generic],
      excludedContentCategoryOptions = [],
      description,
      errors,
      fieldsConfig = [],
      fileTypes,
      index = 0,
      label,
      multiple,
      readonly,
      value: inputValue,
      onChange,
      useDocumentTable = true,
      maxFileSize = DEFAULT_MAX_FILE_SIZE,
      maxFiles,
      availableUploads,
    },
    ref,
  ) => {
    const { t } = useTranslation();

    const hasContent = useMemo(
      () => (multiple ? inputValue.length !== 0 : inputValue.content !== null),
      [inputValue, multiple],
    );
    const value = useMemo(
      () => (multiple ? (inputValue[index] as DocumentFormInput | undefined) : inputValue),
      [inputValue, index, multiple],
    );

    const contentCategoryOptions = useMemo(() => {
      if (fieldsConfig.some(({ fieldName }) => fieldName === 'contentCategoryGroup')) {
        const contentCategoryGroup = value?.contentCategoryGroup;
        if (contentCategoryGroup) {
          return getContentCategoryOptions(contentCategoryGroup, excludedContentCategoryOptions);
        }
        return [];
      }
      return contentCategoryGroupOptions.flatMap((contentCategoryGroup) =>
        getContentCategoryOptions(contentCategoryGroup, excludedContentCategoryOptions),
      );
    }, [fieldsConfig, contentCategoryGroupOptions, value?.contentCategoryGroup, excludedContentCategoryOptions]);

    const handleChange = useCallback(
      (fieldKey: keyof DocumentFormInput) => (newValue: unknown) => {
        if (multiple) {
          onChange?.(newValue as DocumentFormInput[]);
          return;
        }

        const getUpdatedValue = (): DocumentFormInput => {
          switch (fieldKey) {
            case 'content':
              if (newValue) {
                return newValue as DocumentFormInput;
              }
              return { ...inputValue, content: null, fileName: '', mimeType: '' };
            default:
              return { ...inputValue, [fieldKey]: newValue };
          }
        };

        onChange?.(getUpdatedValue());
      },
      [inputValue, multiple, onChange],
    );

    const handleDelete = useCallback(
      (row: DocumentFormInput) => {
        if (multiple) {
          const index = inputValue.findIndex(({ name }) => name === row.name);
          const updatedValue: DocumentFormInput[] = inputValue.toSpliced(index, 1);
          onChange?.(updatedValue);
        } else {
          handleChange('content')(null);
        }
      },
      [multiple, inputValue, onChange, handleChange],
    );

    const renderField = useCallback(
      ({ fieldName, required, label }: DocumentFieldConfig) => {
        const field = {
          label: t(label ?? getDocumentFieldDefaultLabel(fieldName)),
          error: !!errors?.[index]?.[fieldName],
          helperText: errors?.[index]?.[fieldName]?.message,
          readonly: readonly,
          required: required,
          onChange: handleChange(fieldName),
        };

        switch (fieldName) {
          case 'name':
          case 'notes':
          case 'protocolNumber':
          case 'issuer':
            return <TextField {...field} multiline={fieldName === 'notes'} value={value?.[fieldName]} />;
          case 'since':
          case 'until':
          case 'issueDate':
            return <DateField {...field} value={value?.[fieldName]} />;
          case 'contentCategoryGroup':
            return (
              <SelectField
                {...field}
                options={[...contentCategoryGroupOptions]}
                getOptionLabel={(contentCategory) => t(`common.enum.content_category_group.${contentCategory}`)}
                value={value?.[fieldName]}
              />
            );
          case 'contentCategory':
            return (
              <SelectField
                {...field}
                options={[...contentCategoryOptions]}
                disabled={contentCategoryOptions.length === 0}
                getOptionLabel={(contentSubcategory) => t(`common.enum.content_category.${contentSubcategory}`)}
                value={value?.[fieldName]}
              />
            );
        }
      },
      [contentCategoryGroupOptions, contentCategoryOptions, errors, handleChange, index, readonly, t, value],
    );

    return (
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {fieldsConfig.map((fieldConfig) => (
          <Grid2 key={fieldConfig.fieldName} size={{ xs: 12, sm: fieldConfig.grid ?? 6 }}>
            {renderField(fieldConfig)}
          </Grid2>
        ))}
        {useDocumentTable && hasContent && (
          <Grid2 size={12}>
            <DocumentFieldTable
              rows={Array.isArray(inputValue) ? inputValue : [inputValue]}
              onDelete={readonly ? undefined : handleDelete}
            />
          </Grid2>
        )}
        {!readonly && (multiple || !value?.content) && (
          <Grid2 size={12}>
            <DocumentUploadField
              ref={ref}
              description={description}
              label={label}
              fileTypes={fileTypes}
              multiple={multiple}
              error={!!errors?.[index]?.fileName}
              helperText={errors?.[index]?.fileName?.message}
              readonly={readonly}
              required
              onChange={handleChange('content')}
              value={inputValue}
              maxSize={maxFileSize}
              maxFiles={maxFiles}
              availableUploads={availableUploads}
            />
          </Grid2>
        )}
      </Grid2>
    );
  },
);
DocumentField.displayName = 'DocumentField';
export { DocumentField };
