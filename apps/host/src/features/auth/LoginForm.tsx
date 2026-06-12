import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@fpp/shared';
import {
  Alert,
  Button,
  Code,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { useLoginMutation } from '../../store/api/authApi';
import { setUser } from '../../store/slices/userSlice';
import { useTranslation } from '../../hooks/useTranslation';

const DEMO_EMAIL = 'demo@fpp.dev';
const DEMO_PASSWORD = 'password123';

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading, error }] = useLoginMutation();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
  });

  const onSubmit = useCallback(
    async (data: LoginInput) => {
      try {
        const result = await login(data).unwrap();
        dispatch(
          setUser({
            ...result.data.user,
            token: result.data.token,
          })
        );
        window.location.href = '/';
      } catch {
        // error handled by RTK Query
      }
    },
    [login, dispatch]
  );

  return (
    <Paper p="xl" radius="lg" shadow="md" w={{ base: '100%', xs: 420 }} maw={420} mx="auto" mt={{ base: '2rem', sm: '6rem' }} className="fpp-login-card">
      <Stack gap="md">
        <Title order={2}>{t('login.title')}</Title>

        <Alert variant="light" color="blue" title="Demo credentials">
          <Stack gap={6}>
            <Text size="sm">Use these credentials to sign in:</Text>
            <Text size="sm">
              <Text span fw={600}>
                Email:{' '}
              </Text>
              <Code>{DEMO_EMAIL}</Code>
            </Text>
            <Text size="sm">
              <Text span fw={600}>
                Password:{' '}
              </Text>
              <Code>{DEMO_PASSWORD}</Code>
            </Text>
          </Stack>
        </Alert>

        {error && (
          <Alert color="red" title="Login failed">
            {error.status === 'FETCH_ERROR' || error.status === 502 || error.status === 503
              ? 'Cannot reach the API. On Render free tier, open the API health URL first to wake it, then try again.'
              : 'Invalid email or password'}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="sm">
            <TextInput
              label={t('login.email')}
              placeholder={DEMO_EMAIL}
              {...register('email')}
              error={errors.email?.message}
            />
            <PasswordInput
              label={t('login.password')}
              placeholder={DEMO_PASSWORD}
              {...register('password')}
              error={errors.password?.message}
            />
            <Button type="submit" loading={isLoading} fullWidth mt="sm">
              {t('login.signIn')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
