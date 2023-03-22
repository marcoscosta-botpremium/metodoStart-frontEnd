import useLocalStorage from "../hooks/useLocalStorage"
import { createContext } from "react"
import { THEMES } from "../theme/constants"

const initialSettings = {
  activeLayout: "layout",
  direction: "ltr",
  theme: THEMES.DARK,
  responsiveFontSizes: true
};
export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: (arg) => {},
})

const SettingsProvider = ({ children }) => {
  const { data: settings, storeData: setStoreSettings } = useLocalStorage(
    "settings",
    initialSettings
  );

  const saveSettings = (updateSettings) => {
    setStoreSettings(updateSettings)
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
