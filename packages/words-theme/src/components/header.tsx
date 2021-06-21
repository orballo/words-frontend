import { connect, css, useConnect } from "frontity";
import Logo from "./logo";
import { Packages } from "../../types";

const Header: React.FC = () => {
  const { actions } = useConnect<Packages>();

  const headerStyles = css`
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 12px;
  `;

  const logoStyles = css`
    position: relative;
    height: 32px;
    width: auto;
    top: 4px;
  `;

  return (
    <header css={headerStyles}>
      <Logo css={logoStyles} />
      <button onClick={() => actions.auth.signout()}>Logout</button>
    </header>
  );
};

export default connect(Header);
