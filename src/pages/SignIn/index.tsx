import React from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { Container } from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Input
          placeholder="E-mail"
          type="secondary"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <Input placeholder="Senha" type="secondary" secureTextEntry />

        <Button title="Entar" type="primary" />
      </KeyboardAvoidingView>
    </Container>
  );
}
