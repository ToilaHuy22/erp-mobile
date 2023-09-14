import {
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type ArgsVoidFn<T = any> = (...args: T[]) => void;

export type TOnPress = ArgsVoidFn<GestureResponderEvent> | undefined;

export default interface RnPressEvent {
  onPress?: TOnPress;
  onLongPress?: TOnPress;
}
