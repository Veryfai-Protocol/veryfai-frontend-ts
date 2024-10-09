import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src="/small-logo.svg" alt="logo" />
      </Link>
    </div>
  )
}
