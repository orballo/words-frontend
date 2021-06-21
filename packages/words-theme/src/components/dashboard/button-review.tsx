import { connect, css } from "frontity";
import IconReview from "../icons/icon-review";

const ButtonReview: React.FC = () => {
  const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <button css={buttonStyles}>
      Review <IconReview />
    </button>
  );
};

export default connect(ButtonReview);
