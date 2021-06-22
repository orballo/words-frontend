import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonClose from "../forms/button-close";
import Form from "../forms/form";
import InputText from "../forms/input-text";
import InputTags from "../forms/input-tags";
import ButtonSubmit from "../forms/button-submit";
import { Packages } from "../../../types";

const AddWord: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { addWordForm } = state.theme;

  React.useEffect(() => () => actions.theme.resetAddWordForm(), []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await actions.source.addWord();
    actions.router.set("/dashboard");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.theme.updateAddWordField(event.target.name, event.target.value);
  };

  const handleTagsChange = (tags: { value: number; label: string }[]) => {
    actions.theme.updateAddWordField(
      "tags",
      tags.map((tag) => tag.value)
    );
  };

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
      <Form title="Add a new word" onSubmit={handleSubmit}>
        <InputText
          css={inputHangulStyles}
          label="Enter the spelling in Korean"
          name="spelling"
          placeholder="Spelling"
          value={addWordForm.spelling}
          onChange={handleChange}
          disabled={addWordForm.isSubmitting}
        />
        <InputText
          label="Enter the meaning of the word"
          name="meaning"
          placeholder="Meaning"
          value={addWordForm.meaning}
          onChange={handleChange}
          disabled={addWordForm.isSubmitting}
        />
        <InputTags
          label="Add tags to this word (optional)"
          onChange={handleTagsChange}
        />
        <ButtonSubmit label="Save word" />
      </Form>
    </div>
  );
};

export default connect(AddWord);
