import { connect, css } from "frontity";
import IconTag from "../icons/icon-tag";

const ButtonAddTag: React.FC = () => {
  const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <button css={buttonStyles}>
      Add Tag <IconTag />
    </button>
  );
};

export default connect(ButtonAddTag);
