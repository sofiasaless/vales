import { useSettingsContext } from "../../../context/SettingsContext";

interface SettingItem {
  description: string;
  checked: boolean;
  handleToggle: VoidFunction;
}

export function useSettingController() {
  const {
    showSearchEmployeeBar,
    handleToggleSearchEmployeeBar,
    showAddBonus,
    handleToggleAddEmployeeBonus,
  } = useSettingsContext();

  const settingsItems: SettingItem[] = [
    {
      description: "Barra de pesquisar funcionários",
      checked: showSearchEmployeeBar,
      handleToggle: handleToggleSearchEmployeeBar,
    },
    {
      description: "Adição de bônus ao funcionário",
      checked: showAddBonus,
      handleToggle: handleToggleAddEmployeeBonus,
    },
  ];

  return {
    settingsItems,
  };
}
