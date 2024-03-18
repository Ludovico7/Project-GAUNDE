import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import store from './store/redux/index';
import { queryClient } from './util/http';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import PlacesLayout from './pages/PlacesLayout';
import DestinationPath from './components/Result/DestinationPath';
import DestinationStation from './components/Result/DestinationStations';
import DestinationLayout from './pages/DestinationLayout';

const router = createBrowserRouter([
  {path: '/', element: <HomePage />, errorElement: <ErrorPage />,},
  {path: 'places', element: <PlacesLayout />},
  {path: 'result', element: <DestinationLayout />, children: [
    {index: true, element: <DestinationStation />},
    {path: ':place', element: <DestinationPath />}
  ]},
  
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;



/* { path: 'result', element: <MeetingPlaceLayout />, children: [
  {index: true, element: <MeetingPlace />},
  {path: ':name', element: <MeetingPlaceInfoPage />},
] }, */


//, children: [{ index: true, element: <MyCurrentPlace />}],