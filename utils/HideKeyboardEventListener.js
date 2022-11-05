import { Keyboard } from "react-native";

export default function HideKeyboardEventListener(navigation) {
  const _keyboardDidShow = () => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  };

  const _keyboardDidHide = () => {
    navigation.setOptions({
      tabBarStyle: { display: "flex" },
    });
  };

  const addKeyboardEventListener = () => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  };

  const removeKeyboardEventListener = () => {
    Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
  };

  return () => {
    addKeyboardEventListener();

    return () => {
      removeKeyboardEventListener();
    };
  };
}
