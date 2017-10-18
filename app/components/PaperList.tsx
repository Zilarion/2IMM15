import * as React from 'react';
import style      from 'styled-components';
import {PaperItem} from "./PaperItem";

const PaperListContainer = style.div`
    text-align: center;
    float: left;
    width: 70%;
`;

interface PaperListProps {
	papers: Array<PaperType>
}

const PaperList = (props: PaperListProps) => {
	// Map papers to item list or empty span
	let papers;
	if (props.papers.length == 0)
		papers = <span>No papers found.</span>;
	else
		papers = props.papers.map((paper, index:number) => {
			const animTime = index * 50 + 50;
			return <PaperItem
				key={paper.id}
				id={paper.id}
				title={paper.title}
				authors={paper.authors}
				link={paper.link}
				score={paper.score ? paper.score : undefined}
				animTime={animTime}
			/>
		});

	// Render
	return (
		<PaperListContainer>
			{papers}
		</PaperListContainer>
	);
};

export { PaperList };