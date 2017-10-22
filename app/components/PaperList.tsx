import * as React from 'react';
import style      from 'styled-components';
import {PaperItem} from "./PaperItem";

const PaperListContainer = style.div`
    text-align: center;
    width: 100%;
`;

interface PaperListProps {
	papers: Array<PaperType>
}

const PaperList = (props: PaperListProps) => {
	// Map papers to item list or empty span
	let papers;
	if (props.papers.length == 0)
		papers = <span></span>;
	else
		papers = props.papers.map((paper, index:number) => {
			const animTime = index * 50 + 50;
			return <PaperItem
				key={paper.id}
				id={paper.id}
				title={paper.title}
				year={paper.year}
				authors={paper.authors}
				link={paper.link}
				score={paper.score ? paper.score : undefined}
				animTime={animTime}
				showLink={true}
				influence={paper.influence}
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