import { useReducer } from "react";
import { createContext } from "react";
import { DataSets } from "./data";

const initialState = {
  seed: '',
  dataSet: DataSets[0],
  payload: '',
  censor: false,
};

const actions = {
  SET_SEED: "SET_SEED",
  SET_DATASET: "SET_DATASET",
  SET_PAYLOAD: "SET_PAYLOAD",
  SET_CENSOR: "SET_CENSOR",
  RESET: "RESET"
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_SEED:
      return { ...state, seed: action.value };
    case actions.SET_DATASET:
      return { ...state, dataSet: DataSets[action.value] };
    case actions.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case actions.SET_CENSOR:
      return { ...state, censor: action.value };
    case actions.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const GeneratorContext = createContext(initialState);

export function GeneratorProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    seed: state.seed,
    dataSet: state.dataSet,
    payload: state.payload,
    setSeed: value => {
      dispatch({ type: actions.SET_SEED, value });
    },
    setDataSet: value => {
      dispatch({ type: actions.SET_DATASET, value });
    },
    setPayload: value => {
      dispatch({ type: actions.SET_PAYLOAD, value });
    },
    reset: () => {
      dispatch({ type: actions.RESET });
    }
  };

  return (
    <GeneratorContext.Provider value={value}>
      {children}
    </GeneratorContext.Provider>
  );
}