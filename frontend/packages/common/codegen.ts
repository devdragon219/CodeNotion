import { type CodegenConfig } from '@graphql-codegen/cli';

import { scalars } from './lib/gql/scalars';

const config: CodegenConfig = {
  schema: ['../../../graphql/RealGimm.Web.schema.graphql', '../../../graphql/RealGimm.WebFrontOffice.schema.graphql'],
  generates: {
    './lib/gql/types.ts': {
      config: {
        scalars, // typescript
        strictScalars: true, // typescript
      },
      plugins: [
        'typescript',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
    },
    './lib/gql/': {
      config: {
        dedupeFragments: true, // typescript
        dedupeOperationSuffix: true, // typescript-operations
        scalars, // typescript
        strictScalars: true, // typescript
        withHooks: true, // typescript-urql
      },
      documents: ['../../../graphql/WebCommon'],
      plugins: [
        'typescript-operations',
        'typescript-urql',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'types.ts',
        extension: '.tsx',
        folder: '../../../frontend/packages/common/lib/gql',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['./scripts/fix-codegen-output.sh', 'prettier --write'],
    beforeAllFileWrite: ['./scripts/empty-codegen-folder.sh'],
  },
};

export default config;
