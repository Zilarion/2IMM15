'use strict';

// Libraries
import * as React   from 'react';
import style        from 'styled-components';
import {InputField} from "app/components/InputField";
import * as $       from 'jquery';

const SearchContainer = style.div`
    padding: 15px;
`;

const onEnter = (value: string) => {
    const data = {
        query: value
    };
    $.ajax({
        url: "query",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(e){
            console.log("reply!", e)
        }
    });
};

class Search extends React.Component<{}, {}> {
    render() {
        return (
            <SearchContainer>
                <InputField placeholder="Search..." onEnter={onEnter} />
            </SearchContainer>
        );
    }
}

export { Search };
