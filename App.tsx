import * as React from 'react';
import TelaInicial from './screens/TelaInicial/TelaInicial';
import TelaCadastro from './screens/TelaCadastro/TelaCadastro';
import TelaLogin from './screens/TelaLogin/TelaLogin';
import TelaPrincipal from './screens/TelaPrincipal/TelaPrincipal';
import ViewPontos from './screens/ViewPontos/ViewPontos';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import ViewFaculdades from './screens/ViewFaculdades/ViewFaculdades';
import TelaConfiguracao from './screens/TelaConfiguracao/TelaConfiguracao';

type Screen = 'Home' | 'TelaInicial' | 'Cadastro' | 'Login' | 'TelaPrincipal' | 'ViewPontos' | 'ViewFaculdades' | 'TelaConfiguracao';

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
      case 'ViewPontos':
        return <ViewPontos navigate={navigate} />
      case 'ViewFaculdades':
        return <ViewFaculdades navigate={navigate} />
      case 'TelaConfiguracao':
        return <TelaConfiguracao navigate={navigate} userId={userId} userName={userName} />
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
