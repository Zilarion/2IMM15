'use strict';

// Libraries
import * as React from 'react';
import style from 'styled-components';
import * as $ from 'jquery';
import {PaperList} from "app/components/PaperList";
import {InputField} from "app/components/InputField";
import {TopicList} from 'app/components/TopicList';
import {TabSelector} from "../components/TabSelector";
import {withRouter} from "react-router";
import {AuthorList} from "../components/AuthorList";
import {LoadingIndicator} from "../components/LoadingIndicator";

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
	width: 100%;
`;

const HeaderContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
	padding: ${(props: any) => props.theme.margins.small};
	padding-bottom: 0px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	background-color: ${(props: any) => props.theme.colors.header};
`;

const ResultContainer = style.div`
	display: inline-block;
	width: 100%;
`;

const ResultHeader = style.div`
	text-align: left;
	padding: ${(props: any) => props.theme.margins.small};
	padding-bottom: 0px;
	color: ${(props: any) => props.theme.colors.subTitle};
`;

interface SearchProps {
	history: any,
	match: any
}

interface SearchState {
	papers: Array<PaperType>
	authors: Array<AuthorType>
	topics: Array<TopicType>
	loading: boolean
}

class SearchWithoutRouter extends React.Component<SearchProps, SearchState> {
	constructor(props: SearchProps) {
		super();
		this.state = {
			papers: [],
			authors: [],
			topics: [],
			loading: false
		};
		this.onInputEnter = this.onInputEnter.bind(this);
	}

	componentWillMount() {
		let initialUrl = this.props.match.params;
		this.queryForUrl(initialUrl);
	}

	componentWillReceiveProps(nextProps: SearchProps) {
		let oldUrl = this.props.match.params;
		let newUrl = nextProps.match.params;
		if (oldUrl.domain !== newUrl.domain || oldUrl.query !== newUrl.query) {
			this.queryForUrl(newUrl);
		}
	}

	queryForUrl(url: {query: string, domain: string}) {
		this.queryData( {
			query: url.query,
			domain: url.domain
		})
	}

	handleQueryReply(data: any) {
		console.log("Query result: ", data);
		let urlParams = this.props.match.params;
		const domain = urlParams.domain || 'papers';
		if (data.query !== urlParams.query || data.domain !== urlParams.domain) {
			this.props.history.push('/search/' + domain + '/' + data.query);
		}

		if (domain === 'papers') {
			this.setState({
				...this.state,
				papers: data.result.papers,
				topics: data.result.topics,
				authors: []
			});
		} else if (domain === 'authors') {
			this.setState({
				...this.state,
				papers: [],
				authors: data.result.authors,
				topics: []
			})
		}

		this.setState({
			...this.state,
			loading: false
		})
	}

	queryData(postData: { query: string, domain: string }) {
		console.log("Doing query: ", postData);
		this.setState({
			...this.state,
			loading: true
		});

		$.ajax({
			url: "/query",
			type: "POST",
			data: JSON.stringify(postData),
			contentType: "application/json",
			success: (data) => {
				// Handle the change
				this.handleQueryReply({
					result: data,
					query: postData.query,
					domain: postData.domain,
				});
			}
		});
	}

	onInputEnter(value: string) {
		// Reset state
		this.setState({
			...this.state,
			papers: []
		});
		this.queryData({
			query: value,
			domain: this.props.match.params.domain || 'papers'
		});
	}

	render() {
		let params = this.props.match.params;
		let inputField = <InputField
			placeholder="Search..."
			value={params.query}
			onEnter={this.onInputEnter}
		/>;
		if (params.domain === undefined || params.query === undefined)
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
			let searchResult;
			if (this.state.loading) {
				searchResult = <LoadingIndicator />
			} else {
				if (params.domain === 'papers')
					searchResult = (<div>
						<ResultHeader>Results</ResultHeader>
						<PaperList papers={this.state.papers}/>
						<TopicList topics={this.state.topics}/>
					</div>);
				else if (params.domain === 'authors')
					searchResult = (<div>
						<ResultHeader>Results</ResultHeader>
						<AuthorList authors={this.state.authors}/>
						<TopicList topics={this.state.topics}/>
					</div>);
			}

			return (
				<SearchContainer>
					<HeaderContainer>
						<InputContainer>
							{inputField}
						</InputContainer>
						<TabSelector tabs={[
							{label: 'Papers', route: '/search/papers/'   + params.query || '', selected: params.domain === 'papers'},
							{label: 'Authors', route: '/search/authors/' + params.query || '', selected: params.domain === 'authors'}
						]}/>
					</HeaderContainer>
					<ResultContainer>
						{searchResult}
					</ResultContainer>
				</SearchContainer>
			);
		}
	}
}

let Search = withRouter(SearchWithoutRouter);

export {Search};
