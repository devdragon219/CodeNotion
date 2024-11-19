import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './AppWrapper';
import './index.scss';

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
