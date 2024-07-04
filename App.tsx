import * as React from 'react';
import TelaInicial from './screens/TelaInicial/TelaInicial';
import TelaCadastro from './screens/TelaCadastro/TelaCadastro';
import TelaLogin from './screens/TelaLogin/TelaLogin';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

type Screen = 'Home' | 'Details' | 'Cadastro' | 'Login';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <TelaInicial navigate={setCurrentScreen} />;
      case 'Cadastro':
        return <TelaCadastro navigate={setCurrentScreen} />;
      case 'Login':
        return <TelaLogin navigate={setCurrentScreen} />;
      default:
        return <TelaInicial navigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <Toast />
    </View>
  );
};

export default App;
