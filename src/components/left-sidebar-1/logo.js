import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";
import { KgirsLogo, RHMLogo } from "../Images/Images";

const Logo = () => {
  const dispatch = useDispatch();
  const { config, leftSidebar } = useSelector(
    (state) => ({
      config: state.config,
      leftSidebar: state.leftSidebar,
    }),
    shallowEqual
  );
  const { name, collapsed } = { ...config };
  const { showLogo } = { ...leftSidebar };
  if (showLogo) {
    return (
      <div className="logo truncate">
        <Link legacyBehavior href="/">
          <a className="flex flex-row items-center justify-start space-x-2">
            <RHMLogo size={28} />
            {/* <span className="text-green-600">{name}</span> */}
            <span className="text-green-600 self-end">RHM</span>
          </a>
        </Link>
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="ml-auto mr-4 block lg:hidden"
        >
          <FiMenu size={20} className="text-green-600" />
        </button>
      </div>
    );
  }
  return null;
};

export default Logo;
