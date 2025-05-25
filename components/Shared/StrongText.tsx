import { Text, TextProps } from '@chakra-ui/react';

const StrongText = ({ children, ...props }: TextProps) => (
  <Text as="span" fontWeight="bold" display="inline" {...props}>
    {children}
  </Text>
);

export default StrongText;
