import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonClose from "../forms/button-close";
import Form from "../forms/form";
import InputText from "../forms/input-text";
import ButtonSubmit from "../forms/button-submit";
import { Packages } from "../../../types";

const AddTag: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { addTagForm } = state.theme;

  React.useEffect(() => () => actions.theme.resetAddTagForm(), []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.theme.updateAddTagField(event.target.name, event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await actions.source.addTag();
    actions.router.set("/dashboard");
  };

  return (
    <div>
      <ButtonClose />
      <Form title="Add a new tag" onSubmit={handleSubmit}>
        <InputText
          label="Enter the name for the tag"
          name="name"
          placeholder="Name"
          value={addTagForm.name}
          onChange={handleChange}
          disabled={addTagForm.isSubmitting}
        />
        <ButtonSubmit
          label="Add tag"
          disabled={!addTagForm.name || addTagForm.isSubmitting}
        />
      </Form>
    </div>
  );
};

export default connect(AddTag);
