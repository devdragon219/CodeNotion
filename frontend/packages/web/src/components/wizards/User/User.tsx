import { CloseDialog, Dialog, Stepper, Tab } from '@realgimm5/frontend-common/components';
import { UserType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUser } from '../../../hooks/useUser';
import { getEmptyUserFormInput } from '../../../utils/user/initialValues';
import { getUserSchema } from '../../../utils/user/schemas/user';
import { UserConfigStep } from './Config/Config';
import { UserContactsStep } from './Contacts/Contacts';
import { UserGeneralDataStep } from './GeneralData/GeneralData';
import { UserOrgUnitsStep } from './OrgUnits/OrgUnits';
import { UserRecapStep } from './Recap/Recap';
import { UserCreateDialogProps } from './User.types';

export const UserCreateDialog = ({ userType, onClose, onSave }: UserCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseUserName } = useUser();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [user, setUser] = useState(getEmptyUserFormInput(userType));
  const debouncedUser = useDebounce(user);
  const [canUseUserName, setCanUseUserName] = useState(true);

  useEffect(() => {
    checkCanUseUserName(debouncedUser.userName, debouncedUser.userId, setCanUseUserName);
    // eslint-disable-next-line
  }, [debouncedUser.userName, debouncedUser.userId]);

  const canSave = useMemo(
    () => getUserSchema(canUseUserName, language, t, user.status).isValidSync(user),
    [canUseUserName, language, t, user],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(user);
  }, [user, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title={`user.dialog.create.title.${userType}`} onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'user.tab.general_data',
            children: (
              <UserGeneralDataStep
                canUseUserName={canUseUserName}
                user={user}
                onChange={setUser}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'user.tab.config',
            children: (
              <UserConfigStep
                user={user}
                onChange={setUser}
                onError={handleError}
                onBack={handleBack}
                onNext={handleNext}
              />
            ),
          },
          ...((userType === UserType.Internal
            ? [
                {
                  label: 'user.tab.org_unit',
                  children: (
                    <UserOrgUnitsStep
                      user={user}
                      onChange={setUser}
                      onError={handleError}
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  ),
                },
              ]
            : []) as Tab[]),
          {
            label: 'user.tab.contacts',
            children: (
              <UserContactsStep
                user={user}
                onChange={setUser}
                onError={handleError}
                onBack={handleBack}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'user.tab.recap',
            children: <UserRecapStep user={user} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />,
          },
        ]}
      />
    </Dialog>
  );
};
