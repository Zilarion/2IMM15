import * as React from 'react';
import style      from 'styled-components';
import {PaperItem} from "./PaperItem";

const PaperListContainer = style.div`
    text-align: center;
    float: left;
    width: 80%;
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
		papers = props.papers.map((paper, index:number) => {
			const animTime = index * 50 + 50;
			return <PaperItem
				key={paper.id}
				id={paper.id}
				title={paper.title}
				authors={paper.authors}
				link={paper.link}
				score={paper.score}
				animTime={animTime}
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