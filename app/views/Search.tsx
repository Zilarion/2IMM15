'use strict';

// Libraries
import * as React   from 'react';
import style        from 'styled-components';
import * as $       from 'jquery';
import {PaperList}  from "app/components/PaperList";
import {InputField} from "app/components/InputField";
import {TopicList}  from 'app/components/TopicList';
import {TabSelector} from "../components/TabSelector";
import {withRouter} from "react-router";

const CenterContainer = style.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    padding-bottom: 80px;
`;

const InputContainer = style.div`
    width: 600px;
    margin: 0 auto;
`;

const SearchContainer = style.div`
    height: 100%;
    width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
`;

const HeaderContainer = style.div`
    width: 100%;
    padding: ${(props: any) => props.theme.margins.small};
    padding-bottom: 0px;
    background-color: ${(props: any) => props.theme.colors.header};
`;

const ResultContainer = style.div`
    width: 100%
`;

interface SearchState {
    papers: Array<PaperType>
}

class SearchWithoutRouter extends React.Component<{history: any, match: any}, SearchState> {
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

        const domain = this.props.match.domain || 'papers';
			  this.props.history.push('/search/' + domain + '/' + value);

        $.ajax({
            url: "/query",
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
        let params = this.props.match.params;
        let inputField = <InputField placeholder="Search..." value={params.query} onEnter={this.onEnter} />;
        if (!params.domain)
            return (
              <SearchContainer>
                  <CenterContainer>
                      <InputContainer>
                              <h1>NIPS explorer</h1>
                            {inputField}
                      </InputContainer>
                  </CenterContainer>
              </SearchContainer>
            );
        else {
					return (
            <SearchContainer>
                <HeaderContainer>
                    <InputContainer>
									      {inputField}
                    </InputContainer>
                    <TabSelector tabs={[
											{label: 'Papers', route: '/search/papers', selected: params.domain === 'papers'},
											{label: 'Authors', route: '/search/authors', selected: params.domain === 'authors'}
										]}/>
                </HeaderContainer>
                <ResultContainer>
                    <PaperList papers={this.state.papers}/>
                    <TopicList topics={[{name: 'clustering'}]}/>
                </ResultContainer>
            </SearchContainer>
					);
				}
    }
}

let Search = withRouter(SearchWithoutRouter);

export { Search };
