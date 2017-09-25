import * as React from 'react';
import style      from 'styled-components';
import { PaperItem } from 'app/components/PaperItem';

const PaperListContainer = style.div`
    text-align: center;
`;

interface PaperListProps {
	papers: Array<PaperType>
}

const PaperList = (props: PaperListProps) => {
	// Map papers to item list or empty span
	let papers;
	if (props.papers.length == 0)
		papers = <span>Query has no results</span>;
	else
		papers = props.papers.map((paper: PaperType) => {
			return <PaperItem
				key={paper.id}
				id={paper.id}
				title={paper.title}
				authors={paper.authors}
				link={paper.link}
			/>
		});

	// Render
	return (
		<PaperListContainer>
			<h2>Results</h2>
			{papers}
		</PaperListContainer>
	);
};

export { PaperList };