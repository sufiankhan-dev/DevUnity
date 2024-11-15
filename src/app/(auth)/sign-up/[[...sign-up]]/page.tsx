import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="min-h-screen md:max-h-screen bg-zinc-950 flex flex-col lg:flex-row items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-pattern.png"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950" />
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
          <h1 className="text-4xl font-bold mb-6">
            Join <span className="text-[#9CE630]">DevUnity</span> Today
          </h1>
          <p className="text-xl mb-8">
            Connect, collaborate, and grow with our growing developer community.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <span className="text-[#9CE630]">✓</span>
              <span>Access exclusive developer resources</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[#9CE630]">✓</span>
              <span>Participate in coding challenges and hackathons</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[#9CE630]">✓</span>
              <span>Network with industry professionals</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[#9CE630]">✓</span>
              <span>Showcase your projects and skills</span>
            </li>
          </ul>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="bg-zinc-900/80 p-8 rounded-lg backdrop-blur-sm border border-zinc-800 shadow-xl w-full max-w-md">
            <SignUp
              appearance={{
                variables: {
                  colorPrimary: "#9CE630",
                  colorBackground: "#18181b",
                  colorText: "#ffffff",
                  colorTextSecondary: "#a1a1aa",
                  colorInputBackground: "#27272a",
                  colorInputText: "#ffffff",
                },
                elements: {
                  rootBox: "bg-transparent",
                  card: "bg-transparent shadow-none",
                  header: "text-white",
                  headerTitle: "text-white text-2xl",
                  headerSubtitle: "text-zinc-400",
                  socialButtonsBlockButton:
                    "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white",
                  socialButtonsBlockButtonArrow: "text-white",
                  socialButtonsBlockButtonText: "text-white font-normal",
                  dividerLine: "bg-zinc-700",
                  dividerText: "text-zinc-400",
                  formButtonPrimary:
                    "bg-[#9CE630] hover:bg-[#8BD520] text-black normal-case",
                  formFieldLabel: "text-zinc-300",
                  formFieldInput: "bg-zinc-800 border-zinc-700 text-white",
                  footerActionText: "text-zinc-400",
                  footerActionLink: "text-[#9CE630] hover:text-[#8BD520]",
                  identityPreviewText: "text-zinc-300",
                  identityPreviewEditButtonIcon: "text-zinc-400",
                  formFieldInputShowPasswordButton:
                    "text-zinc-400 hover:text-white",
                  formFieldAction: "text-[#9CE630] hover:text-[#8BD520]",
                  formFieldSuccessText: "text-[#9CE630]",
                  formFieldErrorText: "text-red-500",
                  alertText: "text-zinc-300",
                  alertTextDanger: "text-red-500",
                  providerIcon: "text-white",
                  formResendCodeLink: "text-[#9CE630] hover:text-[#8BD520]",
                  otpCodeFieldInput: "bg-zinc-800 border-zinc-700 text-white",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
