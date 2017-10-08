import * as React from 'react';
import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const AuthorItemContainer = styled.div`
    text-align: left;
    padding: ${(props: any) => props.theme.margins.small};
    margin: ${(props: any) => props.theme.margins.small};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		animation: ${fadeIn} ${(props: any) => { return props.animTime }}ms linear;
`;

const AuthorItem = (props: AuthorType) => {
	return (
		<AuthorItemContainer animTime={props.animTime}>
			<a>({props.score.toFixed(2)}) {props.name}</a><br />
		</AuthorItemContainer>
	);
};

export { AuthorItem };