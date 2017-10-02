import * as React from 'react';
import style      from 'styled-components';

const TopicListContainer = style.div`
    text-align: center;
    float: right;
    width: 20%;
`;


type TopicType = {
	name: string,
}

interface TopicListProps {
	topics: Array<TopicType>
}

const TopicList = (props: TopicListProps) => {
	const topics = props.topics.map((topic, index: number) => {
		return <span key={index}>{topic.name}</span>
	});

	// Render
	return (
		<TopicListContainer>
			<h4>Topics</h4>
			{topics}
		</TopicListContainer>
	);
};

export { TopicList };