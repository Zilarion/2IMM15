import * as React from 'react';
import style      from 'styled-components';

const PaperItemContainer = style.div`
    text-align: left;
    padding: ${props => props.theme.margins.small};
    margin: ${props => props.theme.margins.small};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const SubTitleContainer = style.div`
	color: ${props => props.theme.colors.subTitle};
	font-size: 12px;
`;

interface PaperItemProps {
	id: number,
	title: string,
	authors: Array<AuthorType>,
	link?: string
}

const PaperItem = (props: PaperItemProps) => {
	let authorNames = [];
	for (const author of props.authors)
		authorNames.push(author.name);

	console.log(authorNames);
	return (
		<PaperItemContainer>
			<a href={props.link}>{props.title}</a><br />
			<SubTitleContainer>{authorNames.join(', ')}</SubTitleContainer>
		</PaperItemContainer>
	);
};

export { PaperItem };