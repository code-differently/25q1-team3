import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase";

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}
