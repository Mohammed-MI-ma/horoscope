export interface LoginScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}
export interface LoginPostData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string | null;
  refreshToken: string | null;
  user: any; // Replace with your user model
}

export interface RegisterPostData {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
}
