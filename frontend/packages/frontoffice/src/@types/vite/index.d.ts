/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_METHODS?: string;
  readonly VITE_OIDC_AUTHORITY?: string;
  readonly VITE_OIDC_CLIENT_ID?: string;
  readonly VITE_OIDC_REDIRECT_URI?: string;
  readonly VITE_UNSUPPORTED_RAW_FEATURES?: string;
  readonly VITE_USE_HOMEPAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
