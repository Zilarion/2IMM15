import * as React from 'react';
import style      from 'styled-components';
import {AuthorItem} from "./AuthorItem";

const AuthorListContainer = style.div`
    text-align: center;
    width: 100%;
`;

interface AuthorListProps {
	authors: Array<AuthorType>
}

const AuthorList = (props: AuthorListProps) => {
	// Map papers to item list or empty span
	let authors;
	if (props.authors.length == 0)
		authors = <span />;
	else
		authors = props.authors.map((author, index: number) => {
			const animTime = index * 50 + 50;
			return <AuthorItem
				key={index}
				id={author.id}
				name={author.name}
				score={author.score ? author.score : undefined}
				coAuthors={author.coAuthors}
				animTime={animTime}
				showLink={true}
				influence={author.influence}
			/>
		});

	// Render
	return (
		<AuthorListContainer>
			{authors}
		</AuthorListContainer>
	);
};

export { AuthorList };