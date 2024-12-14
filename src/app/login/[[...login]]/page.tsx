import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Login() {
  return (
    <div className="flex my-10 justify-center">
      <SignIn appearance={{ baseTheme: dark }} />
    </div>
  );
}
