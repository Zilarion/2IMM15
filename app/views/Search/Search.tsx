'use strict';

// Libraries
import * as React   from 'react';
import style        from 'styled-components';
import {InputField} from "app/components/InputField";

const SearchContainer = style.div`
    padding: 15px;
`;

class Search extends React.Component<{}, {}> {
    render() {
        return (
            <SearchContainer>
                <InputField placeholder="Search..." />
            </SearchContainer>
        );
    }
}

export { Search };
