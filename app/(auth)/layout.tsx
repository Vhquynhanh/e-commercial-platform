const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 background-light100_dark200 flex w-screen h-screen items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
