import {configureStore} from '@reduxjs/toolkit'

import searchReducer from './search-slice'
import savedReducer from './saved-slice'
import mapReducer from './map-slice'
import controlReducer from './control-slice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    saved: savedReducer,
    map: mapReducer,
    control: controlReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
   })
});

export default store;