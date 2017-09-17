import * as React from 'react';
import style      from 'styled-components';

const InputContainer = style.div`
    text-align: center;
`;

const Input = style.input`
    width: calc(100% - 20px);
    height: 30px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border: none;
    background: transparent;
    :focus {
        outline: none;
        ~ span {
            width: 100%;
        }
    }
`;

const AfterInput = style.span`
    display:inline-block;
    width:0px;
    height: 2px;
    background: #FEC938;
    position: relative;
    top: -13px;
    -webkit-transition: all ease-in-out .15s;
    -o-transition: all ease-in-out .15s;
    transition: all ease-in-out .15s;
`;


interface InputFieldProps {
    placeholder?: string
}

const InputField = (props: InputFieldProps) => {
    return (
        <InputContainer>
            <Input placeholder={props.placeholder}/>
            <AfterInput />
        </InputContainer>
    );
};

export { InputField };