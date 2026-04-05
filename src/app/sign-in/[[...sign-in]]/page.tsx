import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SignIn />
    </div>
  );
}
