'use strict';

// Libraries
import * as React   from 'react';
import style        from 'styled-components';
import * as $       from 'jquery';
import {PaperList} from "../../components/PaperList/PaperList";
import {InputField} from "../../components/InputField/InputField";

const SearchContainer = style.div`
    height: 80px;
`;

const HeaderContainer = style.div`
    position: absolute;
    top: 0px;
    padding: ${(props: any) => props.theme.margins.small};
    width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
`;

const ResultContainer = style.div`
    margin-top: 80px;
    width: 100%
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

        this.setState({
            papers: []
        });

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
                <HeaderContainer>
                    <InputField placeholder="Search..." onEnter={this.onEnter} />
                </HeaderContainer>
                <ResultContainer>
                    <PaperList papers={this.state.papers} />
                </ResultContainer>
            </SearchContainer>
        );
    }
}

export { Search };
