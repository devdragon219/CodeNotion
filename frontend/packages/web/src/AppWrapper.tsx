import { AuthProvider, SidebarProvider } from '@realgimm5/frontend-common/contexts';
import { Component, ErrorInfo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { App } from './App';
import { i18n } from './i18n/i18n';

export default class AppWrapper extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('React error:', error, errorInfo);
  }

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AuthProvider>
      </I18nextProvider>
    );
  }
}
