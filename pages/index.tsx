import { useState, useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";

export default function Home() {
  return <App />;
}

function App() {
  const { active, account } = {
    active: false,
    account: "0xa09B9f6Cd5F371e7f265BaDe818D24EbD60Cfef3",
  };
  const balance = `Ξ0.5`;
  const blockNumber = 10000;

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 text-gray-100">
          {active ? (
            <>
              <div>Mainnet ({blockNumber})</div>
              <div>
                {account.substr(0, 8)}...{account.substr(-8, 8)}
              </div>
              <div>{balance}</div>
              <button
                className="h-10 px-5 border border-gray-400 rounded-md"
                onClick={async () => {
                  // sign message
                }}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <button
                className="h-10 px-5 border border-gray-400 rounded-md"
                onClick={() => {
                  // activate wallet
                }}
              >
                Connect
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
