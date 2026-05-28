import { useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imageP]
  return <div>MessageInput</div>;
}

export default MessageInput;
