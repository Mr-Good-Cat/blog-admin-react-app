import { useDisconnect as useWagmiDisconnect } from "wagmi";
import { removeAccessToken, removeRefreshToken } from "../../helpers/storage";

export const _disconnectHandle = () => {
  removeAccessToken();
  removeRefreshToken();
};

export default function useDisconnect() {
  const { disconnect } = useWagmiDisconnect();

  const disconnectHandler = () => {
    _disconnectHandle();
    disconnect();
  };

  return {
    disconnect: disconnectHandler,
  };
}
