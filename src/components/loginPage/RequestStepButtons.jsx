import { SIGNATURE_REQUEST_STEP_REQUEST_ERROR } from "./ConnectedWallet";
import DisconnectButton from "./RequestStepButtons/DisconnectButton";
import RetryButton from "./RequestStepButtons/RetryButton";

function RequestStepButtons({ signatureRequestStep, retryHandler }) {
  if (signatureRequestStep === SIGNATURE_REQUEST_STEP_REQUEST_ERROR) {
    return (
      <>
        <RetryButton onClick={retryHandler} />

        <DisconnectButton />
      </>
    );
  }

  return <DisconnectButton />;
}

export default RequestStepButtons;
