declare module 'react-native-google-recaptcha-v2' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  export interface GoogleReCaptchaProps extends ViewProps {
    siteKey: string;
    action?: string;
    ref?: React.Ref<any>;
    onExecute: (token: string) => void;
  }

  export class GoogleReCaptcha extends Component<GoogleReCaptchaProps> {}
}
