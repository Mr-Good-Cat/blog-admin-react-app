import useDisconnect from "../../libs/wagmi/useDisconnect";
import { useNavigate } from "react-router-dom";
import { loginPageUrl } from "../../helpers/url";

const Header = () => {
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const disconnectHandler = () => {
    disconnect();
    navigate(loginPageUrl());
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 justify-end">
      <div className="flex items-center py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <button
          onClick={disconnectHandler}
          className="border py-1 px-3 rounded-full border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
