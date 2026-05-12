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
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showSearchEmployeeBar, setShowSearchEmployeeBar] =
    useState<boolean>(false);
  const handleToggleSearchEmployeeBar = async () => {
    const newValue = !showSearchEmployeeBar;
    setShowSearchEmployeeBar(newValue);
    await AsyncStorage.setItem("searchEmployeeBar", JSON.stringify(newValue));
  };

  useEffect(() => {
    const handleVerifySearchEmployeeBar = async () => {
      const value = await AsyncStorage.getItem("searchEmployeeBar");
      if (!value) {
        setShowSearchEmployeeBar(true);
        await AsyncStorage.setItem("searchEmployeeBar", "true");
      } else {
        setShowSearchEmployeeBar(JSON.parse(value));
      }
    };
    handleVerifySearchEmployeeBar();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        showSearchEmployeeBar,
        handleToggleSearchEmployeeBar,
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
