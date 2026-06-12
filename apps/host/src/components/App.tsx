import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { AppShell } from './shell/AppShell';
import { LoginForm } from '../features/auth/LoginForm';
import { MarketplacePage } from '../features/marketplace/MarketplacePage';
import { PluginDashboardPage } from '../features/plugin-dashboard/PluginDashboardPage';
import { PluginRouteRenderer } from './plugin-runtime/PluginRouteRenderer';
import { LoadingFallback } from './common/LoadingFallback';
import { useGetMeQuery } from '../store/api/authApi';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { setUser, clearUser } from '../store/slices/userSlice';

function Router() {
  const [path, setPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const handleNavigate = useCallback(() => {
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handleNavigate);
    window.addEventListener('fpp:navigate', handleNavigate);
    return () => {
      window.removeEventListener('popstate', handleNavigate);
      window.removeEventListener('fpp:navigate', handleNavigate);
    };
  }, [handleNavigate]);

  const isMarketplace =
    path === '/' || path === '/marketplace' || path.startsWith('/marketplace/');

  if (isMarketplace) {
    return <MarketplacePage />;
  }
  if (path === '/plugins/dashboard') {
    return <PluginDashboardPage />;
  }
  if (path.startsWith('/plugins/')) {
    return <PluginRouteRenderer />;
  }
  return <MarketplacePage />;
}

function AuthenticatedApp() {
  return (
    <AppShell>
      <Router />
    </AppShell>
  );
}

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.data && token) {
      dispatch(
        setUser({
          ...data.data,
          token,
        })
      );
    }
  }, [data, token, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearUser());
    }
  }, [isError, dispatch]);

  const isLoginPage =
    typeof window !== 'undefined' && window.location.pathname === '/login';

  if (isLoginPage) {
    return (
      <div style={{ padding: '0 1rem', minHeight: '100vh' }}>
        <LoginForm />
      </div>
    );
  }

  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return <LoadingFallback message="Redirecting to login..." />;
  }

  if (isLoading && !isAuthenticated) {
    return <LoadingFallback message="Authenticating..." />;
  }

  return <AuthenticatedApp />;
}
