import { Box, Card, CardContent, CardHeader, Grid2, Stack, Typography } from '@mui/material';

import { AutocompleteField } from '../../../lib/components/Fields/Autocomplete/Autocomplete';
import { CheckboxField } from '../../../lib/components/Fields/Checkbox/Checkbox';
import { DateField } from '../../../lib/components/Fields/Date/Date';
import { DocumentUploadField } from '../../../lib/components/Fields/DocumentUpload/DocumentUpload';
import { RadioGroupField } from '../../../lib/components/Fields/RadioGroup/RadioGroup';
import { SelectField } from '../../../lib/components/Fields/Select/Select';
import { TextField } from '../../../lib/components/Fields/Text/Text';

export const FieldStories = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Text field" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Small</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" placeholder="placeholder" />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" label="label" />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" placeholder="placeholder" error />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" label="label" error />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" placeholder="placeholder" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" label="label" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" placeholder="placeholder" readonly />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="small" label="label" readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Medium</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" placeholder="placeholder" />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" label="label" />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" placeholder="placeholder" error />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" label="label" error />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" placeholder="placeholder" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" label="label" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" placeholder="placeholder" readonly />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="medium" label="label" readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Large</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" placeholder="placeholder" />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" label="label" />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" placeholder="placeholder" error />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" label="label" error />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" placeholder="placeholder" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" label="label" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" placeholder="placeholder" readonly />
                </Grid2>
                <Grid2 size={6}>
                  <TextField size="large" label="label" readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Date field" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Small</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" placeholder="placeholder" />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" label="label" />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" placeholder="placeholder" error />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" label="label" error />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" placeholder="placeholder" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" label="label" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" placeholder="placeholder" readonly />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="small" label="label" readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Medium</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" placeholder="placeholder" />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" label="label" />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" placeholder="placeholder" error />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" label="label" error />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" placeholder="placeholder" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" label="label" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" placeholder="placeholder" readonly />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="medium" label="label" readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Large</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" placeholder="placeholder" />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" label="label" />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" placeholder="placeholder" error />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" label="label" error />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" placeholder="placeholder" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" label="label" disabled />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" placeholder="placeholder" readonly />
                </Grid2>
                <Grid2 size={6}>
                  <DateField size="large" label="label" readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Dropdown" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Small</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Medium</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Large</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Dropdown multiple" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Small</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    error
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} error multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} multiple disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="small" label="label" options={['Option 1', 'Option 2']} multiple readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Medium</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    error
                    multiple
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} error multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} multiple disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="medium" label="label" options={['Option 1', 'Option 2']} multiple readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Large</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    error
                    multiple
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} error multiple />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} multiple disabled />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <SelectField size="large" label="label" options={['Option 1', 'Option 2']} multiple readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Autocomplete" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Small</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" placeholder="placeholder" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Medium</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" placeholder="placeholder" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Large</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" placeholder="placeholder" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} disabled />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Autocomplete multiple" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Small</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    error
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} multiple error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} multiple disabled />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="small"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="small" label="label" options={['Option 1', 'Option 2']} multiple readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Medium</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    error
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} multiple error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} multiple disabled />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="medium"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="medium" label="label" options={['Option 1', 'Option 2']} multiple readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box>
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Large</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} multiple />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    error
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} multiple error />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    disabled
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} multiple disabled />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField
                    size="large"
                    placeholder="placeholder"
                    options={['Option 1', 'Option 2']}
                    multiple
                    readonly
                  />
                </Grid2>
                <Grid2 size={6}>
                  <AutocompleteField size="large" label="label" options={['Option 1', 'Option 2']} multiple readonly />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Checkbox" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1}>
              <Typography variant="bodyLg">Without label</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <CheckboxField checked={false} />
                <CheckboxField checked={false} disabled />
                <CheckboxField checked={false} readonly />
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <CheckboxField checked />
                <CheckboxField checked disabled />
                <CheckboxField checked readonly />
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <CheckboxField indeterminate />
                <CheckboxField indeterminate disabled />
                <CheckboxField indeterminate readonly />
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1}>
              <Typography variant="bodyLg">With label</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <CheckboxField label="label" checked={false} />
                <CheckboxField label="label" checked={false} disabled />
                <CheckboxField label="label" checked={false} readonly />
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <CheckboxField label="label" checked />
                <CheckboxField label="label" checked disabled />
                <CheckboxField label="label" checked readonly />
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <CheckboxField label="label" indeterminate />
                <CheckboxField label="label" indeterminate disabled />
                <CheckboxField label="label" indeterminate readonly />
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Radio group" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box>
              <Grid2 container spacing={1}>
                <Grid2 size={12}>
                  <Typography variant="bodyLg">Direction column</Typography>
                </Grid2>
                <Grid2 size={4}>
                  <RadioGroupField
                    options={[
                      {
                        label: 'A',
                        value: 'A',
                      },
                      {
                        label: 'B',
                        value: 'B',
                      },
                      {
                        label: 'C',
                        value: 'C',
                      },
                    ]}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <RadioGroupField
                    options={[
                      {
                        label: 'A',
                        value: 'A',
                      },
                      {
                        label: 'B',
                        value: 'B',
                      },
                      {
                        label: 'C',
                        value: 'C',
                      },
                    ]}
                    value="A"
                    disabled
                  />
                </Grid2>
                <Grid2 size={4}>
                  <RadioGroupField
                    options={[
                      {
                        label: 'A',
                        value: 'A',
                      },
                      {
                        label: 'B',
                        value: 'B',
                      },
                      {
                        label: 'C',
                        value: 'C',
                      },
                    ]}
                    value="A"
                    readonly
                  />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1}>
              <Typography variant="bodyLg">Direction row</Typography>
              <RadioGroupField
                row
                options={[
                  {
                    label: 'A',
                    value: 'A',
                  },
                  {
                    label: 'B',
                    value: 'B',
                  },
                  {
                    label: 'C',
                    value: 'C',
                  },
                ]}
              />
              <RadioGroupField
                row
                options={[
                  {
                    label: 'A',
                    value: 'A',
                  },
                  {
                    label: 'B',
                    value: 'B',
                  },
                  {
                    label: 'C',
                    value: 'C',
                  },
                ]}
                value="A"
                disabled
              />
              <RadioGroupField
                row
                options={[
                  {
                    label: 'A',
                    value: 'A',
                  },
                  {
                    label: 'B',
                    value: 'B',
                  },
                  {
                    label: 'C',
                    value: 'C',
                  },
                ]}
                value="A"
                readonly
              />
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Document upload" />
      <CardContent>
        <Stack spacing={3}>
          <DocumentUploadField multiple />
          <DocumentUploadField error />
          <DocumentUploadField disabled />
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);
