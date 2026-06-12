import { ReduxProvider } from '../providers/ReduxProvider';
import { MantineProvider } from '../providers/MantineProvider';
import { PlatformProvider } from '../providers/PlatformProvider';
import { App } from './App';

export function Root() {
  return (
    <ReduxProvider>
      <MantineProvider>
        <PlatformProvider>
          <App />
        </PlatformProvider>
      </MantineProvider>
    </ReduxProvider>
  );
}
