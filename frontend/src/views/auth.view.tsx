import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
  SimpleGrid,
} from '@mantine/core';

import { FacebookButton, GithubButton, GoogleButton } from '../components/social-buttons';
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '../constants';
import { getCurrentUser, login, register } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/user.store';

export default function Auth() {
  const navigate = useNavigate();
  const [setUser] = useAuthStore(state => [state.setUser])
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleForm = async (data: {
    email: string;
    name: string;
    password: string;
    terms: boolean;
  }) => {
    if (type === 'login') {
      const loginResponse = await login({ email: data.email, password: data.password });
      localStorage.setItem(ACCESS_TOKEN, loginResponse.accessToken)
      const user = await getCurrentUser();
      setUser(user);
      navigate("/")
    } else
      register(data)
  }

  return (
    <Flex align="center" justify="center" style={{ width: '100%', height: '100%' }}>
      <Paper radius="md" p="xl" withBorder shadow='sm' style={{ width: '25em' }}>
        <Text size="lg" weight={700} style={{ fontSize: '1.5em' }}>
          Welcome
        </Text>
        <Text size="sm" style={{ marginTop: '.5em' }}>
          {type.charAt(0).toLocaleUpperCase() + type.slice(1)} in to AuthG to continue to AuthG
        </Text>

        <form onSubmit={form.onSubmit((data) => handleForm(data))} style={{ marginTop: '1em' }}>
          <Stack>
            {type === 'register' && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Stack mt="xl">
            <Button type="submit" fullWidth>
              {upperFirst(type)}
            </Button>
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
          </Stack>
        </form>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <SimpleGrid cols={1}>
          <GoogleButton href={GOOGLE_AUTH_URL}>Google</GoogleButton>
          <GithubButton href={GITHUB_AUTH_URL}>Github</GithubButton>
          <FacebookButton href={FACEBOOK_AUTH_URL}>Facebook</FacebookButton>
        </SimpleGrid>

      </Paper>
    </Flex>
  );
}