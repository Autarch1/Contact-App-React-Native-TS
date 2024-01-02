import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigators} from './navigations/RootStackNavigators';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './utils/queryClient';
import {Provider} from 'react-redux';
import {store} from './screens/store/store';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <RootStackNavigators />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}
