import { Component, ErrorInfo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { AuthProvider } from '../lib/contexts/auth/provider';
import { getI18n, resources } from '../lib/i18n/i18n';
import { App } from './App';

const i18n = getI18n(resources);
export default class AppWrapper extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('React error:', error, errorInfo);
  }

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    );
  }
}
