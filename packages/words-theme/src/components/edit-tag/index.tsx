import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonClose from "../forms/button-close";
import Form from "../forms/form";
import InputText from "../forms/input-text";
import ButtonDelete from "../forms/button-delete";
import ButtonSubmit from "../forms/button-submit";
import { Packages } from "../../../types";

const EditTag: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { editTagForm } = state.theme;

  React.useEffect(() => {
    if (!editTagForm.id) actions.router.set("/dashboard");
    return () => actions.theme.resetEditTagForm();
  }, []);

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/dashboard");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.theme.updateEditTagField(event.target.name, event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await actions.source.editTag();
    actions.router.set("/dashboard");
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await actions.source.deleteTag();
    actions.router.set("/dashboard");
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
      <Form title="Edit a tag" onSubmit={handleSubmit}>
        <InputText
          css={inputHangulStyles}
          label="Enter the name for the tag"
          name="name"
          placeholder="Name"
          value={editTagForm.name}
          onChange={handleChange}
          disabled={editTagForm.isSubmitting}
        />
        <div>
          <ButtonSubmit
            label="Save changes"
            disabled={!editTagForm.name || editTagForm.isSubmitting}
          />
          <ButtonDelete
            label="Remove tag"
            onClick={handleDelete}
            disabled={editTagForm.isSubmitting}
          />
        </div>
      </Form>
    </div>
  );
};

export default connect(EditTag);
