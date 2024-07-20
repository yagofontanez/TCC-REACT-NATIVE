import * as React from 'react';
import TelaInicial from './screens/TelaInicial/TelaInicial';
import TelaCadastro from './screens/TelaCadastro/TelaCadastro';
import TelaLogin from './screens/TelaLogin/TelaLogin';
import TelaPrincipal from './screens/TelaPrincipal/TelaPrincipal';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

type Screen = 'Home' | 'TelaInicial' | 'Cadastro' | 'Login' | 'TelaPrincipal';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('Home');
  const [userId, setUserId] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string | null>(null); 

  const navigate = (screen: Screen, params?: any) => {
    if (params) {
      if (params.userId) setUserId(params.userId);
      if (params.nome) setUserName(params.nome); 
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <TelaInicial navigate={navigate} />;
      case 'Cadastro':
        return <TelaCadastro navigate={navigate} />;
      case 'Login':
        return <TelaLogin navigate={navigate} />;
      case 'TelaPrincipal':
        return <TelaPrincipal navigate={navigate} userId={userId} userName={userName} />; 
      default:
        return <TelaInicial navigate={navigate} />;
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
