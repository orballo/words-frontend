import React from "react";
import { connect, useConnect, css } from "frontity";
import Select from "react-select";
import InputText from "./input-text";
import { Packages, Tag } from "../../../types";

interface Props {
  label: string;
  value: { value: number }[];
  disabled?: boolean;
  onChange: (tags: { value: number; label: string }[]) => void;
}

const InputTags: React.FC<Props> = ({
  label,
  value,
  disabled = false,
  onChange,
}) => {
  const { state } = useConnect<Packages>();

  const options = state.source.tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const labelStyles = css`
    display: block;
  `;

  const spanStyles = css`
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
  `;

  return (
    <label css={labelStyles}>
      <span css={spanStyles}>{label}</span>
      <Select
        styles={{
          control: (styles) => ({
            ...styles,
            minHeight: "44px",
            border: "none",
            borderRadius: 0,
            paddingLeft: "4px",
            outline: "none",
            boxShadow: "none",
            paddingTop: "4px",
            paddingBottom: "4px",
            backgroundColor: state.theme.colors.bgOne,
          }),
          input: (styles) => ({
            ...styles,
            color: state.theme.colors.textOne,
          }),
          placeholder: (styles) => ({
            ...styles,
            color: state.theme.colors.textOne + "55",
          }),
          indicatorSeparator: (styles) => ({
            ...styles,
            backgroundColor: state.theme.colors.textOne + "55",
            width: "2px",
          }),
          clearIndicator: (styles) => ({
            ...styles,
            color: state.theme.colors.textOne,
          }),
          dropdownIndicator: (styles) => ({
            ...styles,
            color: state.theme.colors.textOne,
          }),
          multiValue: (styles) => ({
            ...styles,
            margin: "2px",
            borderRadius: "none",
            border: `2px solid ${state.theme.colors.textOne}`,
            color: state.theme.colors.textOne,
            backgroundColor: state.theme.colors.bgOne,
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: state.theme.colors.textOne,
          }),
          valueContainer: (styles) => ({
            ...styles,
            padding: 0,
          }),
        }}
        isMulti
        value={value}
        name="tags"
        options={options}
        placeholder="Tags..."
        onChange={onChange}
        isDisabled={disabled}
      />
    </label>
  );
};

export default connect(InputTags, { injectProps: false });
