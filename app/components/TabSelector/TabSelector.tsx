import * as React from 'react';
import styled     from 'styled-components';

const PaperListContainer = styled.div`
    text-align: center;
`;

interface PaperListProps {
}

const TabSelector = (props: PaperListProps) => {
	return (
		<PaperListContainer>
			<h2>Results</h2>
		</PaperListContainer>
	);
};

export { TabSelector };