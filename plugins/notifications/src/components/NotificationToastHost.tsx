import { useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { usePluginEvent } from '@fpp/plugin-sdk';

/** Renders nothing — only shows toasts when Notifications plugin is enabled. */
export function NotificationToastHost() {
  const handleNotification = useCallback(
    (payload: { message: string; title?: string; variant?: string }) => {
      notifications.show({
        title: payload.title,
        message: payload.message,
        color:
          payload.variant === 'error'
            ? 'red'
            : payload.variant === 'success'
              ? 'green'
              : payload.variant === 'warning'
                ? 'yellow'
                : 'blue',
        autoClose: 4000,
      });
    },
    []
  );

  usePluginEvent('notification.show', handleNotification);

  return null;
}
