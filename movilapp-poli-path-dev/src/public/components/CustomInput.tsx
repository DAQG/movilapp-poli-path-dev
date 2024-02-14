import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';
import React from 'react';
import {useTheme} from '../../config/theme/globalStyles.ts';

interface Props {
  control: any;
  rules?: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  label: string;
  iconName?: string;
}

export const CustomInput = ({
  control,
  name,
  placeholder,
  rules = {},
  secureTextEntry = false,
  label,
  iconName = '',
}: Props) => {
  const colors = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
        return (
          <View>
            <Text style={[styles.label, {color: colors.primary}]}>{label}</Text>
            <View
              style={[
                styles.containerInput,
                {
                  borderColor: error ? colors.secondary : colors.lightGray,
                  backgroundColor: colors.background,
                },
              ]}>
              <View style={styles.labelAndIconContainer}>
                <TextInput
                  style={[styles.textInput, {color: colors.whiteOrBlack}]}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder={placeholder}
                  placeholderTextColor={colors.whiteOrBlackPlaceholder}
                  secureTextEntry={secureTextEntry && !isPasswordVisible}
                />
                {iconName && (
                  <IonIcon
                    onPress={() => togglePasswordVisibility()}
                    name={
                      iconName === 'eye-off'
                        ? isPasswordVisible
                          ? 'eye'
                          : 'eye-off'
                        : iconName
                    }
                    size={20}
                    color="gray"
                  />
                )}
              </View>
            </View>
            {error && (
              <View style={styles.textErrorContainer}>
                <IonIcon
                  name="information-circle"
                  size={18}
                  color={colors.secondary}
                />
                <Text style={[styles.textError, {color: colors.secondary}]}>
                  {error.message || 'Error'}
                </Text>
              </View>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerInput: {
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 12,
    display: 'flex',
    paddingHorizontal: 15,
  },

  textInput: {
    backgroundColor: 'transparent',
    height: 50,
    flex: 3,
  },

  textErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
  },

  textError: {
    fontSize: 13,
    marginBottom: 10,
  },

  label: {
    fontSize: 15,
    marginBottom: 6,
    paddingLeft: 5,
  },

  labelAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
