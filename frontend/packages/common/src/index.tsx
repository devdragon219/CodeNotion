import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../lib/configs/yup.ts';
import '../lib/index.scss';
import App from './AppWrapper';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
