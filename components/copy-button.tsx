import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

type ClipboardProps = {
  wallet_adress: string;
  logo: string; // Add a prop for the SVG logo
};

const Clipboard: React.FC<ClipboardProps> = ({ wallet_adress, logo }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear the message after 2 seconds
    }
  };
  return (
    <div className="mx-auto w-full">
      <div className="relative flex items-center">
        <Image className="m-1" src={logo} alt="Logo" width={24} height={24} />
        <Input
          type="text"
          ref={inputRef}
          value={wallet_adress}
          readOnly
          className="h-8 w-full rounded-lg border py-1 pl-2 text-dark duration-200"
        />
        <Button
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 inline-flex h-6 -translate-y-1/2 items-center justify-center gap-1 rounded-md bg-dark px-2.5 py-1.5 text-sm font-medium text-black duration-200 hover:bg-dark/90"
        >
          <span>
            {copySuccess ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0394 6.0293L8.03936 15.0293L3.68359 10.6736"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              "Copy"
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Clipboard;
