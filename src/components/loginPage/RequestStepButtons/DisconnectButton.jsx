import useDisconnect from "../../../libs/wagmi/useDisconnect";

function DisconnectButton() {
  const { disconnect } = useDisconnect();

  return (
    <button
      onClick={disconnect}
      className="mt-2 rounded-lg border border-stroke p-4 w-full bg-gray-100 hover:bg-blue-100 font-semibold"
    >
      Disconnect
    </button>
  );
}

export default DisconnectButton;
