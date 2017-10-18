import * as React from 'react';
import style      from 'styled-components';

const TopicListContainer = style.div`
    text-align: center;
    float: right;
    width: calc(30% - ${(props: any) => props.theme.margins.smallx4});
    margin: ${(props: any) => props.theme.margins.small};
    padding: ${(props: any) => props.theme.margins.small};
    background-color: ${(props: any) => props.theme.colors.header};
  	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const HeaderTopic = style.h4`
	margin: ${(props: any) => props.theme.margins.small} 0px;
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
			<HeaderTopic>Topics</HeaderTopic>
			{topics}
		</TopicListContainer>
	);
};

export { TopicList };