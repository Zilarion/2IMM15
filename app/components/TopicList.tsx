import * as React from 'react';
import style      from 'styled-components';

const TopicListContainer = style.div`
    text-align: left;
    width: calc(100% - ${(props: any) => props.theme.margins.smallx4});
    margin: ${(props: any) => props.theme.margins.small};
    padding: ${(props: any) => props.theme.margins.small};
`;

const HeaderTopic = style.span`
	display: inline-block;
	width: 100%;
	color: ${(props: any) => props.theme.colors.accent2};
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
				<tr key={index}>
					<td>({topic.number})</td><td>{topic.label}</td>
				</tr>
			);
		});
		topics = <table><tbody>{topics}</tbody></table>;
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