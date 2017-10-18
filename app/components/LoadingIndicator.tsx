import * as React from 'react';
import styled, {keyframes} from 'styled-components';

const LoadingContainer = styled.div`
    margin: 50px auto;
    width: 80px;
`;

const LoadingIndicator = (props: {}) => {
	return (
		<LoadingContainer>Loading...</LoadingContainer>
	);
};

export { LoadingIndicator };