import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonClose from "./button-close";
import InputText from "../forms/input-text";
import InputTags from "../forms/input-tags";
import { Packages } from "../../../types";

const AddWord: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { addWordForm } = state.theme;

  React.useEffect(() => () => actions.theme.resetAddWordForm(), []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.theme.updateAddWordField(event.target.name, event.target.value);
  };

  const formStyles = css`
    background-color: ${state.theme.colors.bgTwo};
    color: ${state.theme.colors.textTwo};
    padding: 12px;
    height: calc(100vh - 52px);
    box-sizing: border-box;
  `;

  const titleStyles = css`
    text-transform: uppercase;
    margin: 0;
    margin-top: 12px;
    margin-bottom: 24px;
  `;

  const inputHangulStyles = css`
    input {
      font-size: 19px;
    }

    input::placeholder {
      font-size: 16px;
    }
  `;

  return (
    <div>
      <ButtonClose />
      <form css={formStyles}>
        <h2 css={titleStyles}>Add a new word</h2>
        <InputText
          css={inputHangulStyles}
          label="Spelling"
          name="spelling"
          placeholder="Spelling"
          value={addWordForm.spelling}
          onChange={handleChange}
          disabled={addWordForm.isSubmitting}
        />
        <InputText
          label="Meaning"
          name="meaning"
          placeholder="Meaning"
          value={addWordForm.meaning}
          onChange={handleChange}
          disabled={addWordForm.isSubmitting}
        />
        <InputTags />
      </form>
    </div>
  );
};

export default connect(AddWord);
