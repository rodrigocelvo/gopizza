import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@hooks/auth';

const { Navigator, Screen, Group } = createNativeStackNavigator();

import { Home } from '@pages/Home';
import { Product } from '@pages/Product';
import { Order } from '@pages/Order';

import { UserTabRoutes } from './user.tab.routes';

export function UserStackRoutes() {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="product" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Screen name="order" component={Order} />
        </Group>
      )}
    </Navigator>
  );
}
