import { type CodegenConfig } from '@graphql-codegen/cli';
import { scalars } from '@realgimm5/frontend-common/gql/scalars';

const config: CodegenConfig = {
  schema: '../../../graphql/RealGimm.WebFrontOffice.schema.graphql',
  documents: ['../../../graphql/WebFrontOffice'],
  generates: {
    './src/gql/': {
      config: {
        dedupeFragments: true, // typescript
        dedupeOperationSuffix: true, // typescript-operations
        scalars, // typescript
        strictScalars: true, // typescript
        withHooks: true, // typescript-urql
      },
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
        baseTypesPath: '~@realgimm5/frontend-common/gql/types',
        extension: '.tsx',
        folder: '../../../frontend/packages/frontoffice/src/gql',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['./scripts/fix-codegen-output.sh', 'prettier --write'],
    beforeAllFileWrite: ['./scripts/empty-codegen-folder.sh'],
  },
};

export default config;
