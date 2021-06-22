import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonClose from "../forms/button-close";
import Form from "../forms/form";
import InputText from "../forms/input-text";
import InputTags from "../forms/input-tags";
import ButtonDelete from "../forms/button-delete";
import ButtonSubmit from "../forms/button-submit";
import { Packages } from "../../../types";

const EditWord: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { editWordForm } = state.theme;

  React.useEffect(() => {
    if (!editWordForm.id) actions.router.set("/search");
    return () => actions.theme.resetEditWordForm();
  }, []);

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/search");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.theme.updateEditWordField(event.target.name, event.target.value);
  };

  const handleTagsChange = (tags: { value: number; label: string }[]) => {
    actions.theme.updateEditWordField(
      "tags",
      tags.map((tag) => tag.value)
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await actions.source.editWord();
    actions.router.set("/search");
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await actions.source.deleteWord();
    actions.router.set("/search");
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
      <ButtonClose onClick={handleClose} />
      <Form title="Edit a word" onSubmit={handleSubmit}>
        <InputText
          css={inputHangulStyles}
          label="Enter the spelling in Korean"
          name="spelling"
          placeholder="Spelling"
          value={editWordForm.spelling}
          onChange={handleChange}
          disabled={editWordForm.isSubmitting}
        />
        <InputText
          label="Enter the meaning of the word"
          name="meaning"
          placeholder="Meaning"
          value={editWordForm.meaning}
          onChange={handleChange}
          disabled={editWordForm.isSubmitting}
        />
        <InputTags
          label="Add tags to this word (optional)"
          value={editWordForm.tags.map((tag) => ({
            value: tag,
            label: state.source.tags.find((t) => t.id === tag).name,
          }))}
          onChange={handleTagsChange}
        />
        <div>
          <ButtonSubmit label="Save changes" />
          <ButtonDelete label="Remove word" onClick={handleDelete} />
        </div>
      </Form>
    </div>
  );
};

export default connect(EditWord);
