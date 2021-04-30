import { useReducer } from "react";
import { createContext } from "react";
import { DataSets } from "./data";

const initialState = {
  seed: '',
  dataSet: DataSets[0],
  censor: true,
  dark: false,
  isGenerating: false,
};

const actions = {
  SET_SEED: "SET_SEED",
  SET_DATASET: "SET_DATASET",
  SET_CENSOR: "SET_CENSOR",
  SET_DARK: "SET_DARK",
  SET_ISGENERATING: "SET_ISGENERATING",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_SEED:
      return { ...state, seed: action.value };
    case actions.SET_DATASET:
      return { ...state, dataSet: action.value };
    case actions.SET_CENSOR:
      return { ...state, censor: action.value };
    case actions.SET_DARK:
      return { ...state, dark: action.value };
    case actions.SET_ISGENERATING:
      return { ...state, isGenerating: action.value };
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
    censor: state.censor,
    dark: state.dark,
    isGenerating: state.isGenerating,
    setSeed: value => {
      dispatch({ type: actions.SET_SEED, value });
    },
    setDataSet: value => {
      dispatch({ type: actions.SET_DATASET, value });
    },
    setCensor: value => {
      dispatch({ type: actions.SET_CENSOR, value });
    },
    setDark: value => {
      dispatch({ type: actions.SET_DARK, value });
    },
    setIsGenerating: value => {
      dispatch({ type: actions.SET_ISGENERATING, value });
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