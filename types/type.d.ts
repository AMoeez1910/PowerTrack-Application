import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  isLoading?: boolean;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  clearText?: () => void;
}
declare type WarningProps = {
  id: string;
  message: string;
};
declare interface batteryProps {
  id: string;
  name: string;
  charge: number;
  batteryConfig: {
    Cdl:number;
    Rct:number;
    R0:number;
  }
  warning: WarningProps[];
}
declare interface carDataProps {
  id: string;
  img: any;
  battery: batteryProps[];
  info: {
    temperature: number;
    range: number;
  };
}
