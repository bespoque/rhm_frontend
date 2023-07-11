import {useSelector, shallowEqual} from 'react-redux'
import Link from 'next/link'

const Footer = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  let {name} = {...config}
  return (
    <div className="flex flex-row items-center justify-between w-full text-xs z-10">
      <div className="text-white">&copy; {name} 2020</div>
      <div className="flex flex-row ml-auto space-x-2">
        <Link legacyBehavior href="/privacy-policy">
          <a>Privacy policy</a>
        </Link>
        <Link legacyBehavior href="/terms-of-service">
          <a>Terms of service</a>
        </Link>
        <Link legacyBehavior href="/contact-us">
          <a>Contact us</a>
        </Link>
      </div>
    </div>
  )
}

export default Footer
