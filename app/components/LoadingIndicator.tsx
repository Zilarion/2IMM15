import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import ReactLoading from 'react-loading';

const LoadingContainer = styled.div`
   width: 100%;
`;

const LoadingInner = styled.div`
   margin: 64px auto;
   width: 100px;
`;

const LoadingIndicator = (props: {}) => {
	return (
		<LoadingContainer>
			<LoadingInner>
				<ReactLoading type={'bars'} color={'#3e96fa'} delay={50} />
			</LoadingInner>
		</LoadingContainer>
	);
};

export { LoadingIndicator };