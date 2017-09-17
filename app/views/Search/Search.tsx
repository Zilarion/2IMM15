'use strict';

// Libraries
import * as React        from 'react';
import style  from 'styled-components';

const SearchContainer = style.div`
    padding: 15px;
`;

const SearchInput = style.input`
    width: calc(100% - 20px);
    height: 30px;
    padding: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border: none;
    :focus {
        outline: none;
    }
`;

class Search extends React.Component<{}, {}> {
    render() {
        return (
            <SearchContainer>
                <SearchInput placeholder="Search..."/>
            </SearchContainer>
        );
    }
}

export { Search };
