import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SettingsContextType {
  showSearchEmployeeBar: boolean;
  handleToggleSearchEmployeeBar: () => Promise<void>;
  showAddBonus: boolean;
  handleToggleAddEmployeeBonus: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

enum SETTINGS_OPTIONS {
  SEARCH_EMPLOYEE_BAR = "searchEmployeeBar",
  ADD_EMPLOYEE_BONUS = "addEmployeeBonus",
}

const DEFAULT_SETTING_OPTION_VALUE = {
  [SETTINGS_OPTIONS.ADD_EMPLOYEE_BONUS]: false,
  [SETTINGS_OPTIONS.SEARCH_EMPLOYEE_BAR]: true,
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showSearchEmployeeBar, setShowSearchEmployeeBar] =
    useState<boolean>(false);
  const handleToggleSearchEmployeeBar = async () => {
    const newValue = !showSearchEmployeeBar;
    setShowSearchEmployeeBar(newValue);
    await AsyncStorage.setItem(
      SETTINGS_OPTIONS.SEARCH_EMPLOYEE_BAR,
      JSON.stringify(newValue),
    );
  };

  const [showAddBonus, setShowAddBonus] = useState<boolean>(false);
  const handleToggleAddEmployeeBonus = async () => {
    const newValue = !showAddBonus;
    setShowAddBonus(newValue);
    await AsyncStorage.setItem(
      SETTINGS_OPTIONS.ADD_EMPLOYEE_BONUS,
      JSON.stringify(newValue),
    );
  };

  const handleVerifyOptions = async (
    option: SETTINGS_OPTIONS,
    set: (v: boolean) => void,
  ) => {
    const value = await AsyncStorage.getItem(option);
    if (!value) {
      const defaultValue = DEFAULT_SETTING_OPTION_VALUE[option];
      set(defaultValue);
      await AsyncStorage.setItem(option, String(defaultValue));
    } else {
      set(JSON.parse(value));
    }
  };

  useEffect(() => {
    const initializeSettings = async () => {
      await Promise.all([
        handleVerifyOptions(
          SETTINGS_OPTIONS.SEARCH_EMPLOYEE_BAR,
          setShowSearchEmployeeBar,
        ),
        handleVerifyOptions(
          SETTINGS_OPTIONS.ADD_EMPLOYEE_BONUS,
          setShowAddBonus,
        ),
      ]);
    };

    initializeSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        showSearchEmployeeBar,
        handleToggleSearchEmployeeBar,
        handleToggleAddEmployeeBonus,
        showAddBonus,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext deve ser usado dentro de um SettingsContext",
    );
  }
  return context;
};
