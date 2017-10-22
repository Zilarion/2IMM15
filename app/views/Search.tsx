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

const DataContainer = style.div`
	width: 80%;
	display: inline-block;
	float: right;
`;

const TopicContainer = style.div`
	width: 20%;
	display: inline-block;
	float: left;
`;


const InputContainer = style.div`
	width: 600px;
	height: 50px;
	display: inline-block;
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
	border-bottom: 1px solid ${(props: any) => props.theme.colors.divider};
	padding: ${(props: any) => props.theme.margins.small} ${(props: any) => props.theme.margins.medium};
	padding-bottom: ${(props: any) => props.theme.margins.tiny};
	font-size: 12px;
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
	loading: boolean,
	count: number,
	total: number,
	duration: number
}

class SearchWithoutRouter extends React.Component<SearchProps, SearchState> {
	constructor(props: SearchProps) {
		super();
		this.state = {
			papers: [],
			authors: [],
			topics: [],
			loading: false,
			count: 0,
			total: 0,
			duration: 0
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
		if (oldUrl.domain !== newUrl.domain || oldUrl.query !== newUrl.query || oldUrl.topic !== newUrl.topic) {
			this.queryForUrl(newUrl);
		}
	}

	queryForUrl(url: {query: string, domain: string, topic: string}) {
		this.queryData( {
			query: url.query,
			domain: url.domain,
			topic: parseInt(url.topic) || 0
		})
	}

	handleQueryReply(data: any) {
		let urlParams = this.props.match.params;
		const domain = urlParams.domain || 'papers';

		if (domain === 'papers') {
			this.setState({
				...this.state,
				papers: data.result.papers,
				topics: data.result.topics,
				count: data.result.count,
				total: data.result.total,
				duration: data.result.duration,
				authors: []
			});
		} else if (domain === 'authors') {
			this.setState({
				...this.state,
				papers: [],
				topics: [],
				count: data.result.count,
				total: data.result.total,
				duration: data.result.duration,
				authors: data.result.authors
			})
		}

		this.setState({
			...this.state,
			loading: false
		})
	}

	queryData(postData: { query: string, domain: string, topic: number }) {
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
		const domain = this.props.match.params.domain || 'papers';
		this.props.history.push('/search/' + domain + '/' + value);

		const topic = this.props.match.params.topic || 0;

		this.queryData({
			query: value,
			domain: domain,
			topic: topic
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
				let topics = (<TopicContainer>
						<TopicList
							topics={this.state.topics}
							query={params.query}
							domain={params.domain}
						/>
					</TopicContainer>
				);
				let resultHeader = (
					<ResultHeader>
						Showing {this.state.count} of {this.state.total} results ({this.state.duration.toFixed(5)} seconds)
					</ResultHeader>
				);
				if (params.domain === 'papers')
					searchResult = (<div>
						{resultHeader}
						{topics}
						<DataContainer>
							<PaperList papers={this.state.papers}/>
						</DataContainer>
					</div>);
				else if (params.domain === 'authors')
					searchResult = (<div>
						{resultHeader}
						{topics}
						<DataContainer>
							<AuthorList authors={this.state.authors}/>
						</DataContainer>
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
