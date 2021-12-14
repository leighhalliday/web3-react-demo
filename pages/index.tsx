import { useState, useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";

export default function Home() {
  return (
    <Web3ReactProvider
      getLibrary={(provider: any) => new Web3Provider(provider)}
    >
      <App />
    </Web3ReactProvider>
  );
}

function App() {
  const { active, account, activate, chainId, library } = useWeb3React();
  const balance = useBalance();
  const blockNumber = useBlockNumber();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 text-gray-100">
          {active ? (
            <>
              <div>
                {chainId === 1 ? "Mainnet" : "Testnet"} ({blockNumber})
              </div>
              <div>
                {account.substr(0, 8)}...{account.substr(-8, 8)}
              </div>
              <div>{balance}</div>
              <button
                className="h-10 px-5 border border-gray-400 rounded-md"
                onClick={async () => {
                  const message = `Logging in at ${new Date().toISOString()}`;
                  const signature = await library
                    .getSigner(account)
                    .signMessage(message)
                    .catch((error) => console.error(error));
                  console.log({ message, account, signature });
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
                  activate(new InjectedConnector({}));
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

function useBalance() {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (account) {
      library.getBalance(account).then((val) => setBalance(val));
    }
  }, [account, library]);

  return balance ? `${formatEther(balance)} ETH` : null;
}

function useBlockNumber() {
  const { library } = useWeb3React();
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    if (library) {
      const updateBlockNumber = (val) => setBlockNumber(val);
      library.on("block", updateBlockNumber);

      return () => {
        library.removeEventListener("block", updateBlockNumber);
      };
    }
  }, [library]);

  return blockNumber;
}
