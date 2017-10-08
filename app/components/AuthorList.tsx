import * as React from 'react';
import style      from 'styled-components';
import {AuthorItem} from "./AuthorItem";

const AuthorListContainer = style.div`
    text-align: center;
    float: left;
    width: 80%;
`;

interface AuthorListProps {
	authors: Array<AuthorType>
}

const AuthorList = (props: AuthorListProps) => {
	// Map papers to item list or empty span
	let authors;
	if (props.authors.length == 0)
		authors = <span>Query has no results</span>;
	else
		authors = props.authors.map((author, index: number) => {
			const animTime = index * 50 + 50;
			return <AuthorItem
				key={index}
				id={author.id}
				name={author.name}
				score={author.score}
				animTime={animTime}
			/>
		});

	// Render
	return (
		<AuthorListContainer>
			<h2>Results</h2>
			{authors}
		</AuthorListContainer>
	);
};

export { AuthorList };