import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { ParseKeys } from 'i18next';

import { CheckboxTable } from '../../../lib/components/Tables/Checkbox/Checkbox';
import { PrimaryTable } from '../../../lib/components/Tables/Primary/Primary';
import { SecondaryTable } from '../../../lib/components/Tables/Secondary/Secondary';

interface ExpandibleRow {
  id: number;
  category?: string;
  subcategory?: string;
  name?: string;
  subRows?: ExpandibleRow[];
}

export const TableStories = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Primary table" />
      <CardContent>
        <Stack spacing={3}>
          <PrimaryTable
            color="secondary"
            columns={[
              {
                id: 'category',
                label: 'Category' as ParseKeys,
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getCanExpand: (depth) => depth === 0,
                getCanSelect: (depth) => depth === 0,
              },
              {
                id: 'subcategory',
                label: 'Subcategory' as ParseKeys,
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getCanExpand: (depth) => depth === 1,
                getCanSelect: (depth) => depth === 1,
              },
              {
                id: 'name',
                label: 'Name' as ParseKeys,
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getCanSelect: (depth) => depth > 1,
              },
            ]}
            rows={
              [
                {
                  id: 0,
                  category: 'Tecnici (5)',
                  subRows: [
                    {
                      id: 1,
                      subcategory: 'Impianti (2)',
                      subRows: [
                        {
                          id: 2,
                          name: 'Idraulico',
                        },
                        {
                          id: 3,
                          name: 'Elettrico',
                        },
                      ],
                    },
                  ],
                },
              ] as ExpandibleRow[]
            }
            getRowId={({ id }) => String(id)}
            getSubRows={(row) => row.subRows}
            useRowExpandCollapse
            useRowSelection={false}
            useSelectedRows={false}
          />
        </Stack>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Secondary table" />
      <CardContent>
        <Stack spacing={3}>
          <SecondaryTable
            columns={['A' as ParseKeys, 'B' as ParseKeys, 'C' as ParseKeys]}
            rows={[
              ['A1', 'B1', 'C1'],
              ['A2', 'B2', 'C2'],
              ['A3', 'B3', 'C3'],
            ]}
          />
          <SecondaryTable
            columns={['A' as ParseKeys, 'B' as ParseKeys, 'C' as ParseKeys]}
            rows={[
              {
                row: ['A1', 'B1', 'C1'],
                children: [{ row: [null, 'B2', 'C2'], children: [[null, null, 'C3']], collapseColumnIndex: 1 }],
                collapseColumnIndex: 0,
              },
            ]}
          />
        </Stack>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Checkbox table" />
      <CardContent>
        <Stack spacing={3}>
          <CheckboxTable
            columns={['Column1' as ParseKeys, 'Column2' as ParseKeys]}
            options={['Option1', 'Option2', 'Option3']}
            rows={[
              {
                groupName: 'Group1',
                rowName: 'Row1',
                optionValues: { Option1: true, Option2: false, Option3: false },
              },
              {
                groupName: 'Group1',
                rowName: 'Row2',
                optionValues: { Option1: false, Option2: false, Option3: false },
              },
              {
                groupName: 'Group2',
                rowName: 'Row1',
                optionValues: { Option1: false, Option2: false, Option3: false },
              },
            ]}
            onChange={(values) => {
              console.log(values);
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);
