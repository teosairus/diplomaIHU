import React from "react";
import TextFieldInput from "./TextfieldInput";
import "./registerForm-styles.scss";

const RegisterForm = (props) => {
  const { registerData, setRegisterData, isError, setIsError } = props;

  return (
    <div className="registerForm-container">
      <TextFieldInput
        name="firstname"
        label="Όνομα"
        isRequired={true}
        isError={isError}
        inputType="string"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε το όνομά σας"
        selectedValue={registerData.firstname}
        errorMessage="Το πεδίο δεν μπορεί να μείνει κενό."
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
      <TextFieldInput
        name="lastname"
        label="Επώνυμο"
        isRequired={true}
        isError={isError}
        inputType="string"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε το επίθετό σας"
        selectedValue={registerData.lastname}
        errorMessage="Το πεδίο δεν μπορεί να μείνει κενό."
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
      <TextFieldInput
        name="email"
        label="Email"
        isRequired={true}
        isError={isError}
        inputType="string"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε το email σας"
        selectedValue={registerData.email}
        errorMessage="Παρακαλώ εισάγετε ένα έγκυρο email."
        registerData={registerData}
        setRegisterData={setRegisterData}
        validation="isEmail"
      />
      <TextFieldInput
        name="password"
        label="Password"
        isRequired={true}
        isError={isError}
        inputType="password"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε όνομα χρήστη"
        selectedValue={registerData.password}
        errorMessage="Το πεδίο δεν μπορεί να μείνει κενό."
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
      <TextFieldInput
        name="scopusID"
        label="Scopus ID"
        isError={isError}
        inputType="string"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε το scopus ID σας"
        selectedValue={registerData.scopusID}
        errorMessage="Παρακαλώ εισάγετε ένα έγκυρο scopus ID"
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
      <TextFieldInput
        name="orcid"
        label="Orcid"
        isError={isError}
        inputType="string"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε το orcid σας"
        selectedValue={registerData.orcid}
        errorMessage="Παρακαλώ εισάγετε ένα έγκυρο orcid"
        registerData={registerData}
        setRegisterData={setRegisterData}
        // charLimit={16}
        // validation={{ charNumber: "16" }}
      />
      <TextFieldInput
        name="location"
        label="Τοποθεσία"
        isError={isError}
        inputType="string"
        setIsError={setIsError}
        placeholder="Παρακαλώ εισάγετε την τοποθεσία σας"
        selectedValue={registerData.location}
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
    </div>
  );
};

export default RegisterForm;
