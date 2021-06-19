import { keyframes, css, connect, useConnect } from "frontity";
import { Packages } from "../../types";

const Loading: React.FC<{ className?: string }> = ({ className }) => {
  const { state } = useConnect<Packages>();

  const container = css`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const scale = keyframes`
    0% {transform: scaley(1.0)}
    50% {transform: scaley(0.4)}
    100% {transform: scaley(1.0)}
  `;

  const bar = (index: number) => css`
    background-color: ${state.theme.colors.bgTwo};
    width: 4px;
    height: 24px;
    margin: auto 3px;
    border-radius: 0;
    display: inline-block;
    animation: ${scale} 1s ${index * 0.1}s infinite
      cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation-fill-mode: both;
  `;

  return (
    <div css={container} className={className}>
      <div>
        <div css={bar(1)} />
        <div css={bar(2)} />
        <div css={bar(3)} />
        <div css={bar(4)} />
        <div css={bar(5)} />
      </div>
    </div>
  );
};

export default connect(Loading);
