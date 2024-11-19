import { yupResolver } from '@hookform/resolvers/yup';
import { Loader, StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  GetAllCatalogueItemsDocument,
  GetAllCatalogueItemsQuery,
} from '../../../../gql/RealGimm.Web.CatalogueItem.operation';
import { TicketChecklistsFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';
import { getTicketChecklistsTicketChecklistTemplatesSchema } from '../../../../utils/ticketChecklist/schemas/ticketChecklists';
import { TicketChecklistsTicketChecklistTemplatesStepProps } from './TicketChecklistTemplates.types';
import { TicketChecklistTemplatesTransferList } from './TransferList/TransferList';

export const TicketChecklistsTicketChecklistTemplatesStep = ({
  ticketChecklists,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistsTicketChecklistTemplatesStepProps) => {
  const { t } = useTranslation();
  const client = useClient();
  const [loading, setLoading] = useState(true);

  const fetchCatalogueTypes = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetAllCatalogueItemsQuery> = await client.query(GetAllCatalogueItemsDocument, {
      where: {
        estate: {
          id: {
            in: ticketChecklists.estateUnits.map(({ estate }) => estate.id),
          },
        },
      },
    });
    const catalogueTypes =
      result.data?.catalogueItem.listCatalogueItemsFull.reduce<TicketChecklistsFormInput['catalogueTypes']>(
        (acc, item) => {
          if (acc[item.catalogueType.id]?.includes(item.estate.id)) return acc;

          return {
            ...acc,
            [item.catalogueType.id]: [...(acc[item.catalogueType.id] ?? []), item.estate.id],
          };
        },
        {},
      ) ?? {};
    setLoading(false);
    return {
      ...ticketChecklists,
      catalogueTypes,
    };
  }, [client, ticketChecklists]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketChecklistsFormInput>({
    defaultValues: fetchCatalogueTypes,
    resolver: yupResolver(getTicketChecklistsTicketChecklistTemplatesSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketChecklistsFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.ticketChecklistTemplates) {
      onError(errors.ticketChecklistTemplates.message);
    }
    // eslint-disable-next-line
  }, [errors.ticketChecklistTemplates]);

  const catalogueTypeIds = useMemo(
    () => Object.keys(ticketChecklists.catalogueTypes).map(Number),
    [ticketChecklists.catalogueTypes],
  );

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      {loading ? (
        <Loader />
      ) : (
        <TicketChecklistTemplatesTransferList catalogueTypeIds={catalogueTypeIds} control={control} />
      )}
    </StepForm>
  );
};
