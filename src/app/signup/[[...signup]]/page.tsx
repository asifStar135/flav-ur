import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Signup() {
  return (
    <div className="my-10 flex justify-center">
      <SignUp
        appearance={{ baseTheme: dark }}
        forceRedirectUrl="/preferences"
      />
    </div>
  );
}
