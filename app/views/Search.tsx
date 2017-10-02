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

type SearchProps = {
  history: any,
  match: any
}

class SearchWithoutRouter extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super();
        this.state = {
            papers: []
        };
			  this.onInputEnter = this.onInputEnter.bind(this);
    }

    componentWillMount() {
			let urlParams = this.props.match.params;
			if(urlParams.domain && urlParams.query)
				this.queryData({
					query: urlParams.query,
					domain: urlParams.domain
				})
    }

    handleChange(data: any) {
        // TODO no longer assume every reply is a paper :)
        this.setState({
          papers: data.papers
        });
    }

    queryData(postData: {query: string, domain: string}) {
			$.ajax({
				url: "/query",
				type: "POST",
				data: JSON.stringify(postData),
				contentType: "application/json",
				success: (data) => {
					// Handle the change
					this.handleChange({
						papers: data
					});
					if (postData.query !== this.props.match.params.query || postData.domain !== this.props.match.params.domain) {
						const domain = this.props.match.params.domain || 'papers';
						this.props.history.push('/search/' + domain + '/' + postData.query);
					}
				}
			});
    }

    onInputEnter(value: string) {
        // Reset state
        this.setState({
          papers: []
        });

        this.queryData({
          query: value,
					domain: this.props.match.params.domain
        });
    }

    render() {
        let params = this.props.match.params;
        let inputField = <InputField
          placeholder="Search..."
          value={params.query}
          onEnter={this.onInputEnter}
        />;
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
