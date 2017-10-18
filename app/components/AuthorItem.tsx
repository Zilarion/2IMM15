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

const AuthorScoreContainer = styled.div`
	float: right;
	font-size: 10px;
	color: ${(props: any) => props.theme.colors.subTitle};
`;

const AuthorItemContainer = styled.div`
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

const DataContainer = styled.div`
	display: inline-block;
	width: 100%;
  display: inline;
`;


const AuthorItem = (props: AuthorType) => {
	let coAuthors;
	if (props.coAuthors) {
		let authorArrayString = props.coAuthors.map((coauthor, index: number) => {
			if (index === 5) {
				return 'and ' + (props.coAuthors.length - 5) + ' more.';
			} else if (index < 5) {
				return coauthor.name;
			}
		});
		const coAuthorString = authorArrayString.filter((item) => typeof item !== 'undefined').join(', ');
		coAuthors = <SubTitleContainer>Worked with: {coAuthorString}</SubTitleContainer>;
	}
	let authorScore = props.score ? props.score.toFixed(2) : '';

	return (
		<AuthorItemContainer animTime={props.animTime}>
			<AuthorScoreContainer>{authorScore}</AuthorScoreContainer>
			<DataContainer>
				<StyledLink to={'/author/' + props.id}>{props.name}</StyledLink><br />
				{coAuthors}
			</DataContainer>
		</AuthorItemContainer>
	);
};

export { AuthorItem };