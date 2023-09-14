import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewProps,
  ColorValue,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import RnPressEvent from '@/types/common';
import { Colors } from '@/theme/Variables';

interface IButtonProps
  extends Partial<RnPressEvent>,
    Partial<TouchableOpacity> {
  isLoading?: boolean;
  isDisabled?: boolean;
  children: string | React.ReactNode;
  textLoading?: string;
  stylesBtn?: StyleProp<ViewStyle>;
  stylesText?: StyleProp<TextStyle>;
  indicatorProps?: ViewProps & {
    color?: ColorValue;
    size: 'small' | 'large';
  };
}
const Button = React.memo(
  ({
    isDisabled,
    isLoading,
    children,
    textLoading,
    indicatorProps,
    stylesBtn,
    stylesText,
    onPress,
    onLongPress,
  }: IButtonProps) => {
    const content = React.useMemo(() => {
      // fallback when pass invalid children
      if (isLoading) {
        return (
          <View style={styles.viewIndicator}>
            <ActivityIndicator
              style={styles.indicator}
              color={Colors.white}
              {...indicatorProps}
            />
            <Text style={styles.textDefault}>
              {textLoading || 'Loading...'}
            </Text>
          </View>
        );
      }
      if (typeof children === 'string') {
        return <Text style={(styles.textDefault, stylesText)}>{children}</Text>;
      }
      return children;
    }, [indicatorProps, isLoading, textLoading, children, stylesText]);

    const _styleBtn = React.useMemo(() => {
      return [styles.normal, stylesBtn];
    }, [stylesBtn]);

    return (
      <TouchableOpacity
        style={_styleBtn}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={isDisabled}
      >
        {content}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  normal: {
    borderRadius: 5,
    backgroundColor: Colors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginRight: 12,
  },
  textDefault: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Button;
