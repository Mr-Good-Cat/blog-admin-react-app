import { useConnect } from "wagmi";
import { MetamaskIcon } from "../icons/MetamaskIcon";

const icons = {
  MetaMask: <MetamaskIcon />,
};

function ConnectWallet() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const getBtnTitle = (connector) => {
    if (!connector.ready) {
      return "Unsupported";
    }

    if (isLoading && connector.id === pendingConnector?.id) {
      return "Connecting...";
    }

    return connector.name;
  };

  return (
    <div className="bg-white w-1/2 mx-auto p-8 mt-8">
      <h2 className="mb-9 pb-2 text-2xl font-bold text-black sm:text-title-xl2 border-b text-center">
        Connect your wallet
      </h2>

      <div className="mx-auto w-1/2 py-10">
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            className="flex justify-center items-center gap-3.5 rounded-lg border border-stroke p-4 w-full bg-gray-100 hover:bg-blue-100 font-semibold"
          >
            {icons[connector.name] || null}

            {getBtnTitle(connector)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ConnectWallet;
