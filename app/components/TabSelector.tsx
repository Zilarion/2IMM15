import * as React from 'react';
import styled     from 'styled-components';
import {Link} from "react-router-dom";

const TabSelectorContainer = styled.div`
	display: inline-block;
	width: 100%;
	margin-top:  ${(props: any) => props.theme.margins.medium};
`;

const TabItem = styled.div`
	position: relative;
	top: 5px;
	text-align: center;
	border-bottom: ${(props: any) => props.selected ? '2px solid ' + props.theme.colors.accent : ''};
	color: ${(props: any) => props.selected ? props.theme.colors.accent : props.theme.colors.inactive };
	display: inline-block;
	padding: ${(props: any) => props.theme.margins.tiny};
	float: left;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

type TabType = {
	label: string,
	route: string,
	selected?: boolean
}

interface TabSelectorProps {
	tabs: Array<TabType>
}

const TabSelector = (props: TabSelectorProps) => {
	const tabs = props.tabs.map((tab, index: number) => {
		return <TabItem
			key={index}
			selected={tab.selected}
		><StyledLink to={tab.route}>{tab.label}</StyledLink></TabItem>
	});

	return (
		<TabSelectorContainer>
			{tabs}
		</TabSelectorContainer>
	);
};

export { TabSelector };