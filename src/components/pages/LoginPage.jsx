import { useAccount } from "wagmi";
import ConnectWallet from "../loginPage/ConnectWallet";
import ConnectedWallet from "../loginPage/ConnectedWallet";

function LoginPage() {
  const { address, isConnected } = useAccount();

  return isConnected ? (
    <ConnectedWallet address={address} />
  ) : (
    <ConnectWallet />
  );
}

export default LoginPage;
