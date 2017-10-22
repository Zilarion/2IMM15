import * as React from 'react';
import style      from 'styled-components';
import {Link} from "react-router-dom";

const TopicListContainer = style.div`
    text-align: left;
    width: calc(100% - ${(props: any) => props.theme.margins.smallx4});
    margin: ${(props: any) => props.theme.margins.small};
    padding: ${(props: any) => props.theme.margins.small};
`;

const StyledRouterLink = style(Link)`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
	&:hover {
		color: ${(props: any) => props.theme.colors.hover};
	}
`;

const HeaderTopic = style.span`
	display: inline-block;
	width: 100%;
	color: ${(props: any) => props.theme.colors.accent2};
`;

interface TopicListProps {
	topics: Array<TopicType>
	query: string
	domain: string
}

const TopicList = (props: TopicListProps) => {
	let topics;
	if (props.topics.length == 0)
		return (<div />);
	else {
		let topicArray = props.topics;
		topicArray.sort((a, b) => {
			if (a.label < b.label) return -1;
			if (a.label > b.label) return 1;
			return 0;
		});
		topics = topicArray.map((topic: TopicType, index: number) => {
			return (
				<tr key={index}>
					<td>({topic.number})</td>
					<td><StyledRouterLink to={'/search/' + props.domain + '/' + props.query + '/' + topic.label}>{topic.label}</StyledRouterLink> </td>
				</tr>
			);
		});
		topics = (<table>
			<tbody>{topics}</tbody>
		</table>);


		// Render
		return (
			<TopicListContainer>
				<HeaderTopic>Topics</HeaderTopic>
				{topics}
			</TopicListContainer>
		);
	}
};

export { TopicList };