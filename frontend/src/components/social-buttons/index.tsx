import { ButtonProps, Button, Group } from "@mantine/core";
import { GithubIcon, DiscordIcon, TwitterIcon } from '@mantine/ds';

import { GoogleIcon } from "./google-icon.component";
import { FacebookIcon } from "./facebook-icon.component";

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return <Button component="a" leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
  }
  
  export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return (
      <Button
        component="a"
        leftIcon={<FacebookIcon />}
        sx={(theme) => ({
          backgroundColor: '#4267B2',
          color: '#fff',
          '&:not([data-disabled]):hover': {
            backgroundColor: theme.fn.darken('#4267B2', 0.1),
          },
        })}
        {...props}
      />
    );
  }
  
  export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return (
      <Button
        component="a"
        leftIcon={<DiscordIcon size="1rem" />}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
          '&:not([data-disabled]):hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.lighten('#5865F2', 0.05)
                : theme.fn.darken('#5865F2', 0.05),
          },
        })}
        {...props}
      />
    );
  }
  
  // Twitter button as anchor
  export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return (
      <Button
        component="a"
        leftIcon={<TwitterIcon size="1rem" color="#00ACEE" />}
        variant="default"
        {...props}
      />
    );
  }
  
  export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return (
      <Button
        component="a"
        {...props}
        leftIcon={<GithubIcon size="1rem" />}
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
          },
        })}
      />
    );
  }
  
  export function SocialButtons() {
    return (
      <Group position="center" sx={{ padding: 15 }}>
        <GoogleButton>Continue with Google</GoogleButton>
        <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
          Follow on Twitter
        </TwitterButton>
        <FacebookButton>Sign in with Facebook</FacebookButton>
        <GithubButton>Login with GitHub</GithubButton>
        <DiscordButton>Join Discord community</DiscordButton>
      </Group>
    );
  }