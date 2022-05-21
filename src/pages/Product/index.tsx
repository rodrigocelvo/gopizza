import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { InputPrice } from '@components/InputPrice';
import { Button } from '@components/Button';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setdDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handlePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (
      !image ||
      !name.trim() ||
      !description.trim() ||
      !priceSizeP ||
      !priceSizeM ||
      !priceSizeG
    ) {
      Alert.alert('Cadastro', 'Preencha todos os campos');
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        princes_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
      .catch(() => Alert.alert('Cadastro', 'Erro ao cadastrar a pizza.'));

    setIsLoading(false);
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image} />
          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handlePicker}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              placeholder="Nome do produto"
              onChangeText={setName}
              value={name}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              placeholder="Descrição do produto"
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setdDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanho e preços</Label>

            <InputPrice
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          <Button
            title="Cadastrar Pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
