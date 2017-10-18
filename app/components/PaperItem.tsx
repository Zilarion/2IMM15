import * as React from 'react';
import styled, {keyframes} from 'styled-components';

import {Link} from "react-router-dom";


const StyledLink = styled.a`
	text-decoration: none;
	font-size: 10px;
	color: ${(props: any) => props.theme.colors.link};
	&:hover {
		color: ${(props: any) => props.theme.colors.hover};
	}
`;

const StyledRouterLink = styled(Link)`
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
    padding: ${(props: any) => props.theme.margins.medium};
		animation: ${fadeIn} ${(props: any) => { return props.animTime }}ms ease-in;
		
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
`;

const SubTitleContainer = styled.div`
	color: ${(props: any) => props.theme.colors.subTitle};
	font-size: 12px;
`;

const PaperScoreContainer = styled.div`
	position: absolute;
	display: inline-block;
	right: ${(props: any) => props.theme.margins.small};
	font-size: 10px;
	color: ${(props: any) => props.theme.colors.subTitle};
`;

const DataContainer = styled.div`
  display: inline-block;
  width: calc(100% - 83px);
`;

const IconContainer = styled.div`
	display: inline-block;
	float: left;
	margin-right: ${(props: any) => props.theme.margins.small};
	background-color: ${(props: any) => props.theme.colors.divider};
	color:  ${(props: any) => props.theme.colors.white};
	
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	
	padding: ${(props: any) => props.theme.margins.tiny};
	border-radius: 25px;
	width: 28px;
	height: 28px;
`;

const PaperItem = (props: PaperType & {showLink: boolean}) => {
	let authorNames = [];
	for (const author of props.authors)
		authorNames.push(author.name);

	let authorString = authorNames.join(', ');
	if (authorNames.length > 0)
		authorString = 'Authors: ' + authorString;

	let paperScore = props.score ? props.score.toFixed(2) : '';

	const link = props.showLink ? <StyledRouterLink to={'/paper/' + props.id}>{props.title} ({props.year})</StyledRouterLink> : props.title;
	return (
		<PaperItemContainer animTime={props.animTime}>
			<PaperScoreContainer>{paperScore}</PaperScoreContainer>
			<IconContainer>
				<i className="material-icons">description</i>
			</IconContainer>
			<DataContainer>
				{link}<br />
				<StyledLink target="_blank" href={props.link}>{props.link}</StyledLink>
				<SubTitleContainer>{authorString}</SubTitleContainer>
			</DataContainer>
		</PaperItemContainer>
	);
};

export { PaperItem };