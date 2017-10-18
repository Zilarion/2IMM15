import * as React from 'react';
import style      from 'styled-components';

const TopicListContainer = style.div`
    text-align: center;
    float: right;
    width: calc(20% - ${(props: any) => props.theme.margins.smallx2});
    padding: ${(props: any) => props.theme.margins.small};
    padding-top: 0px;
    background-color: ${(props: any) => props.theme.colors.header};
`;

interface TopicListProps {
	topics: Array<TopicType>
}

const TopicList = (props: TopicListProps) => {
	let topics;
	if (props.topics.length == 0)
		topics = <span>No related topics.</span>
	else {
		topics = props.topics.map((topic: TopicType, index: number) => {
			return (
				<div key={index}>
					<span>({topic.number}) {topic.label}</span>
					<br/>
				</div>
			);
		});
	}

	// Render
	return (
		<TopicListContainer>
			<h4>Topics</h4>
			{topics}
		</TopicListContainer>
	);
};

export { TopicList };