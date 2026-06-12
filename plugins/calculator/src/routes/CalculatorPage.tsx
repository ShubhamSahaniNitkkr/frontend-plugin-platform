import { Stack, Title } from '@mantine/core';
import { Calculator } from '../components/Calculator';

export function CalculatorPage() {
  return (
    <Stack gap="lg" maw={400} mx="auto">
      <Title order={2}>Calculator</Title>
      <Calculator />
    </Stack>
  );
}
