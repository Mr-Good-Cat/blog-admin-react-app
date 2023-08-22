import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../helpers/storage";
import { parseJwt } from "../../helpers/jwt";
import { compareCaseInsensitive } from "../../helpers/string";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageListUrl } from "../../helpers/url";
import { ApiClient } from "../../libs/axios/ApiClient";
import { useSignMessage } from "wagmi";
import UniversalLoader from "../commons/UniversalLoader";
import RequestStepButtons from "./RequestStepButtons";

const _isLogin = (address) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const payload = parseJwt(accessToken);
    return compareCaseInsensitive(payload.wallet, address);
  } catch (e) {
    return false;
  }
};

const SIGNATURE_REQUEST_STEP_REQUEST_ONE_TIME_PASS = "request_on_time_pass";
const SIGNATURE_REQUEST_STEP_REQUEST_WAITING_SIGNATURE = "waiting_signature";
const SIGNATURE_REQUEST_STEP_REQUEST_VALIDATE_SIGNATURE = "validate_signature";
export const SIGNATURE_REQUEST_STEP_REQUEST_ERROR = "error";

function ConnectedWallet({ address }) {
  const navigate = useNavigate();
  const [signatureRequestStep, setSignatureRequestStep] = useState(
    SIGNATURE_REQUEST_STEP_REQUEST_ONE_TIME_PASS,
  );
  const [isLogin, setIsLogin] = useState(_isLogin(address));
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (!isLogin) {
      const apiClient = requestJWT(address);
      return () => apiClient.abort("signToken");
    }
  }, [isLogin]);

  const requestJWT = (address) => {
    const apiClient = new ApiClient();
    setSignatureRequestStep(SIGNATURE_REQUEST_STEP_REQUEST_ONE_TIME_PASS);

    apiClient
      .signToken(address)
      .then((message) => {
        setSignatureRequestStep(
          SIGNATURE_REQUEST_STEP_REQUEST_WAITING_SIGNATURE,
        );
        return signMessageAsync({ message });
      })
      .then((signature) => {
        setSignatureRequestStep(
          SIGNATURE_REQUEST_STEP_REQUEST_VALIDATE_SIGNATURE,
        );
        return apiClient.signIn(address, signature);
      })
      .then(({ accessToken, refreshToken }) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsLogin(true);
      })
      .catch((e) => {
        setSignatureRequestStep(SIGNATURE_REQUEST_STEP_REQUEST_ERROR);
      });

    return apiClient;
  };

  const getTextsRequestStep = () => {
    if (signatureRequestStep === SIGNATURE_REQUEST_STEP_REQUEST_ONE_TIME_PASS) {
      return {
        header: "Waiting for the server message",
        description:
          "Please wait while the server generates a one-time message to sign.",
      };
    }

    if (
      signatureRequestStep === SIGNATURE_REQUEST_STEP_REQUEST_WAITING_SIGNATURE
    ) {
      return {
        header: "Signature request",
        description:
          "Please sign the message in your wallet so that we can verify that this is indeed your wallet.",
      };
    }

    if (
      signatureRequestStep === SIGNATURE_REQUEST_STEP_REQUEST_VALIDATE_SIGNATURE
    ) {
      return {
        header: "Server is verifying the signature",
        description: "Please wait till the server verifies your signature.",
      };
    }

    return {
      header: "Error",
      description: "Something went wrong, please retry the action.",
    };
  };

  if (isLogin) {
    navigate(pageListUrl(null));
  }

  const texts = getTextsRequestStep();

  return (
    <div className="bg-white w-1/2 mx-auto p-8 mt-8">
      {signatureRequestStep !== SIGNATURE_REQUEST_STEP_REQUEST_ERROR && (
        <UniversalLoader hScreen={false} />
      )}

      <h2 className="font-semibold text-3xl mt-2 text-center">
        {texts.header}
      </h2>
      <p className="text-gray-500 text-center">{texts.description}</p>

      <RequestStepButtons
        signatureRequestStep={signatureRequestStep}
        retryHandler={() => requestJWT(address)}
      />
    </div>
  );
}

export default ConnectedWallet;
