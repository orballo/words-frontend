import { connect, css, useConnect } from "frontity";
import IconWord from "../icons/icon-word";
import { Packages } from "../../../types";

const ButtonAddWord: React.FC = () => {
  const { actions } = useConnect<Packages>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/add-word");
  };

  const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <button css={buttonStyles} onClick={handleClick}>
      Add Word <IconWord />
    </button>
  );
};

export default connect(ButtonAddWord);
