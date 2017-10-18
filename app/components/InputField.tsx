import * as React from 'react';
import style      from 'styled-components';

const InputContainer = style.div`
	text-align: center;
	position: relative;
	height: 50px;
	display: inline-block;
	width: 100%;
`;

const Input = style.input`
    width: calc(100% - 48px);
    height: 30px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border: none;
    background: white;
		padding-left: 38px;
    :focus {
        outline: none;
        ~ span {
            width: 100%;
        }
    }
`;


const IconContainer = style.span`
	position: absolute;
	top: 12px;
	left: 8px;
	display: inline-block;
	color: ${(props: any) => props.theme.colors.subTitle };
`;

const AfterInput = style.span`
    display: block;
    width:0px;
    height: 2px;
    background: ${(props: any) => props.theme.colors.accent };
    position: relative;
    -webkit-transition: all ease-in-out .15s;
    -o-transition: all ease-in-out .15s;
    transition: all ease-in-out .15s;
`;


interface InputFieldProps {
	placeholder: string,
	onEnter: Function,
	value: string
}

interface InputFieldState {
	value: string
}

class InputField extends React.Component<InputFieldProps, InputFieldState> {
	constructor(props: InputFieldProps) {
		super();
		this.state = {
			value: props.value || ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.keyPress = this.keyPress.bind(this);
	}

	keyPress(inputChar: any){
		const key = inputChar.key;
		if(key == 'Enter') {
			this.props.onEnter(this.state.value);
		}
	}

	componentWillReceiveProps(nextProps: InputFieldProps) {
		if (nextProps.value !== this.state.value)
			this.setState({
				value: nextProps.value
			});
	}

	handleChange(event: any) {
		this.setState({
			value: event.target.value
		});
	}

	render() {
		return (
			<InputContainer>
				<IconContainer>
					<i className="material-icons">search</i>
				</IconContainer>
				<Input autoFocus
							 value={this.state.value}
							 placeholder={this.props.placeholder}
							 onChange={this.handleChange}
							 onKeyPress={this.keyPress}
				/>
				<AfterInput />
			</InputContainer>
		);
	}
}

export { InputField };