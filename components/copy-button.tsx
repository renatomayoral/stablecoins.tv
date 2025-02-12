import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ClipboardProps = {
  wallet_adress: string;
  logo: React.ReactNode; // Add a prop for the SVG logo
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
    <div className="mx-auto w-full max-w-[400px]">
      <div className="relative flex items-center">
        {logo && <div className="mr-2">{logo}</div>}{" "}
        <Input
          type="text"
          ref={inputRef}
          value={wallet_adress}
          readOnly
          className="h-8 w-full rounded-lg border py-3 pl-5 pr-14 text-dark duration-200"
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
