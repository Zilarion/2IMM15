'use strict';

// Libraries
import * as React   from 'react';
import style        from 'styled-components';
import {InputField} from "app/components/InputField";
import {PaperList}  from "app/components/PaperList";
import * as $       from 'jquery';

const SearchContainer = style.div`
    padding: 15px;
`;

interface SearchState {
    papers: Array<PaperType>
}

class Search extends React.Component<{}, SearchState> {

    constructor() {
        super();
        this.state = {
            papers: []
        };
        this.onEnter = this.onEnter.bind(this);
    }

    handleChange(data: any) {
        // TODO no longer assume every reply is a paper :)
        this.setState({
            papers: data.papers
        });
    }

    onEnter(value: string) {
        const data = {
            query: value
        };
        $.ajax({
            url: "query",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: (data) => {
                // Handle the change
                this.handleChange({
                    papers: data
                });
            }
        });
    }

    render() {
        return (
            <SearchContainer>
                <InputField placeholder="Search..." onEnter={this.onEnter} />
                <PaperList papers={this.state.papers} />
            </SearchContainer>
        );
    }
}

export { Search };
