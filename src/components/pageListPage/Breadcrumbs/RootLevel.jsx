import { pageListUrl } from "../../../helpers/url";
import HomeIcon from "../../icons/HomeIcon";
import { Link } from "react-router-dom";

function RootLevel() {
  return (
    <Link
      to={pageListUrl(null)}
      className="text-gray-600 hover:text-indigo-900"
    >
      <HomeIcon />
    </Link>
  );
}

export default RootLevel;
