import WagmiProvider from "./WagmiProvider/WagmiProvider";

function RootProvider({ children }) {
  return <WagmiProvider>{children}</WagmiProvider>;
}

export default RootProvider;
