import { Loader, Stack, Text } from '@mantine/core';

export function LoadingFallback({ message = 'Loading...' }: { message?: string }) {
  return (
    <Stack align="center" py="xl" gap="sm">
      <Loader size="sm" />
      <Text size="sm" c="dimmed">
        {message}
      </Text>
    </Stack>
  );
}
