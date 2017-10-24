import * as React from 'react';
import style, {keyframes} from 'styled-components';
import {withRouter} from "react-router";

const HeaderContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
	padding: ${(props: any) => props.theme.margins.small};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	background-color: ${(props: any) => props.theme.colors.header};
`;

const IconBackContainer = style.div`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
	cursor: pointer;
	&:hover {
		color: ${(props: any) => props.theme.colors.hover};
	}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const DataContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx4});
	padding: ${(props: any) => props.theme.margins.small};
	margin: ${(props: any) => props.theme.margins.small};
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	display: inline-block;
	animation: ${fadeIn} 200ms ease-in;
`;

const Image = style.img`
	width: 100%;
`;


class EvolutionWithoutRouter extends React.Component<{history: any}, {}> {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<HeaderContainer>
					<IconBackContainer onClick={this.props.history.goBack}>
						<i className="material-icons">arrow_back</i>
					</IconBackContainer>
				</HeaderContainer>
				<DataContainer>
					<Image src={'https://raw.githubusercontent.com/JeroenvanDoorenmalen/Information_retrieval/master/final_barchart.png'} />
					<Image src={'https://raw.githubusercontent.com/JeroenvanDoorenmalen/Information_retrieval/master/final_areachart.png'} />
				</DataContainer>
			</div>
		);
	}
}

const Evolution = withRouter(EvolutionWithoutRouter);

export { Evolution };
