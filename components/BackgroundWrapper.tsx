import React from "react";

const BackgroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-[#1e00ff] via-[#7000ff] to-[#f000ff] py-12">
      {children}
    </main>
  );
};
export default BackgroundWrapper;
