import { Badge } from '@mantine/core';

export function LiveIndicator({ label = 'Live' }: { label?: string }) {
  return (
    <Badge
      variant="dot"
      color="green"
      size="sm"
      className="fpp-live-badge"
      leftSection={<span className="fpp-live-dot" aria-hidden />}
    >
      {label}
    </Badge>
  );
}
