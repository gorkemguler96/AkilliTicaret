import React from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';

interface FormattedMoneyProps {
  value: number;
  style?: StyleProp<TextStyle>;
}

const FormattedMoney: React.FC<FormattedMoneyProps> = ({value, style}) => {
  const formattedValue = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(value || 0);

  return <Text style={style}>{formattedValue}</Text>;
};

export default FormattedMoney;
