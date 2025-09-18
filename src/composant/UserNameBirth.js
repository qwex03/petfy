import React, { useState } from "react";
import Input from "./input";
import InputNumber from "./inputNumber";

const UserNB = ({ value, onChange }) => {
    const { userAge } = value;

    const onBirthDateChange = (newAge) => {
        onChange({ ...value, userAge: newAge });
    };

    return (
        <div>
            <h2>Date de naissance : </h2>
            <InputNumber
                length={8}
                values={userAge}
                onChange={onBirthDateChange}
                placeholder="Entrez votre date de naissance"
                label={"date de naissance"}
            />
        </div>
    );
};

export default UserNB;
