import { createContext, useReducer } from "react";
import "../styles/globals.css";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES"
}

const storeReducer = (state, action) => {
  switch(action.type){
    case ACTION_TYPES.SET_LAT_LONG:
      return {...state, latLong: action.payload.latLong}
    case ACTION_TYPES.SET_COFFEE_STORES:
      return {...state, coffeeStoresNearby: action.payload.coffeeStoresNearby}
    default:
      throw new Error(`Unhandled Action Type: ${action.type}`)
  }
}

const StoreProvider = ({children}) => { 
  const initialState = {
    latLong: "",
    coffeeStoresNearby: []
  }

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value = {{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StoreProvider>
      <Component {...pageProps} />
      {/* <footer>&copy; 2022 And4Web.</footer> */}

      </StoreProvider>
    </div>
  );
}

export default MyApp;
