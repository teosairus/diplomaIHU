import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";
import isEmailValid from "../../../utils/isEmailValid";
import "./textfieldInput-styles.scss";

const TextFieldInput = (props) => {
  const {
    label,
    selectedValue,
    name,
    isError,
    setIsError,
    errorMessage,
    placeholder,
    registerData,
    setRegisterData,
    inputType,
    isRequired,
    validation,
    // charLimit,
  } = props;

  const [value, setValue] = useState(selectedValue || "");
  const [isErr, setIsErr] = useState(!!(isError && isError[`${name}`]));

  useEffect(() => {
    setValue(selectedValue || "");
  }, [selectedValue]);

  const updateData = (val) => {
    if (val.length === 0 && isRequired) {
      setIsErr(true);
      let tempErr = { ...isError };
      tempErr[`${name}`] = true;
      setIsError({ ...tempErr });

      let temp = { ...registerData };
      temp[`${name}`] = val;
      setRegisterData({ ...temp });
    } else if (validation === "isEmail" && isEmailValid(val) === false) {
      setIsErr(true);
      let tempErr = { ...isError };
      tempErr[`${name}`] = true;
      setIsError({ ...tempErr });

      let temp = { ...registerData };
      temp[`${name}`] = val;
      setRegisterData({ ...temp });
    } else {
      setIsErr(false);
      let tempErr = { ...isError };
      tempErr[`${name}`] = false;
      setIsError({ ...tempErr });

      let temp = { ...registerData };
      temp[`${name}`] = val;
      setRegisterData({ ...temp });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFunc = useCallback(
    debounce((val) => {
      updateData(val);
    }, 1000),
    []
  );

  return (
    <div className="textfieldInput-container">
      <TextField
        className="textfieldInput-textfield"
        required={isRequired}
        label={label}
        placeholder={placeholder}
        type={inputType}
        variant="standard"
        value={value}
        error={isErr}
        helperText={isErr && errorMessage}
        onChange={(e) => {
          setValue(e.target.value);
          debounceFunc(e.target.value);
        }}
        // inputProps={{
        //   maxLength: charLimit || "",
        // }}
      />
    </div>
  );
};

export default TextFieldInput;
