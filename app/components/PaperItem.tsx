import * as React from 'react';
import styled, {keyframes} from 'styled-components';

import {Link} from "react-router-dom";

const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
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

const PaperItemContainer = styled.div`
    text-align: left;
    display: relative;
    padding: ${(props: any) => props.theme.margins.small};
    margin: ${(props: any) => props.theme.margins.small};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		animation: ${fadeIn} ${(props: any) => { return props.animTime }}ms linear;
`;

const SubTitleContainer = styled.div`
	color: ${(props: any) => props.theme.colors.subTitle};
	font-size: 12px;
`;

const PaperScoreContainer = styled.div`
	float: right;
	font-size: 10px;
	color: ${(props: any) => props.theme.colors.subTitle};
`;

const DataContainer = styled.div`
	display: inline-block;
	width: 100%;
  display: inline;
`;

const PaperItem = (props: PaperType) => {
	let authorNames = [];
	for (const author of props.authors)
		authorNames.push(author.name);

	let authorString = authorNames.join(', ');
	if (authorNames.length > 0)
		authorString = 'Authors: ' + authorString;

	let paperScore = props.score ? props.score.toFixed(2) : '';

	return (
		<PaperItemContainer animTime={props.animTime}>
			<PaperScoreContainer>{paperScore}</PaperScoreContainer>
			<DataContainer>
				<StyledLink to={'/paper/' + props.id}>{props.title} ({props.year})</StyledLink><br />
				<SubTitleContainer>{authorString}</SubTitleContainer>
			</DataContainer>
		</PaperItemContainer>
	);
};

export { PaperItem };