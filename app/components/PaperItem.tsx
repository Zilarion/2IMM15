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

const PaperItemContainer = styled.div`
    text-align: left;
    padding: ${(props: any) => props.theme.margins.small};
    margin: ${(props: any) => props.theme.margins.small};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		animation: ${fadeIn} ${(props: any) => { return props.animTime }}ms linear;
`;

const SubTitleContainer = styled.div`
	color: ${(props: any) => props.theme.colors.subTitle};
	font-size: 12px;
`;

const PaperItem = (props: PaperType) => {
	let authorNames = [];
	for (const author of props.authors)
		authorNames.push(author.name);

	return (
		<PaperItemContainer animTime={props.animTime}>
			<a href={props.link}>({props.score.toFixed(2)}) {props.title}</a><br />
			<SubTitleContainer>{authorNames.join(', ')}</SubTitleContainer>
		</PaperItemContainer>
	);
};

export { PaperItem };