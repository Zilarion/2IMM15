// Libraries
import * as React from 'react';
import style from 'styled-components';
import {withRouter} from "react-router";
import * as $ from 'jquery';
import {LoadingIndicator} from "../components/LoadingIndicator";
import {PaperList} from "../components/PaperList";
import {AuthorList} from "../components/AuthorList";
import {Link} from "react-router-dom";


const StyledRouterLink = style(Link)`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
	&:hover {
	color: ${(props: any) => props.theme.colors.hover};
}`;

const HeaderContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
	padding: ${(props: any) => props.theme.margins.small};
	padding-bottom: 0px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	background-color: ${(props: any) => props.theme.colors.header};
`;

const AuthorContainer = style.div`
	display: inline-block;
	width: 50%;
	float: right;
`;

const PaperContainer = style.div`
	display: inline-block;
	width: 50%;
	float: left;
`;

const DataHeader = style.h4`
	margin: 0px;
	margin-left: ${(props: any) => props.theme.margins.small};
`;

interface AuthorProps {
	history: any,
	match: any
}

interface AuthorState {
	loading: boolean,
	author: AuthorType
}

class AuthorWithoutRouter extends React.Component<AuthorProps, AuthorState> {
	constructor() {
		super();
		this.state = {
			loading: false,
			author: undefined
		};
	}

	queryForUrl(id: string) {
		this.setState({
			... this.state,
			loading: true
		});
		let postData = {'domain': 'author', 'query': parseInt(id, 10)};
		$.ajax({
			url: "/query",
			type: "POST",
			data: JSON.stringify(postData),
			contentType: "application/json",
			success: (data) => {
				// Handle the change
				this.setState({
					... this.state,
					loading: false,
					author: data.author
				})
			}
		});
	}
	componentWillMount() {
		this.queryForUrl(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps: AuthorProps) {
		this.queryForUrl(nextProps.match.params.id);
	}

	render() {
		let searchResult;
		if (this.state.loading) {
			searchResult = <LoadingIndicator />
		} else {
			searchResult = (
				<div>
					<HeaderContainer>
						<StyledRouterLink to={'/search/authors/' + this.state.author.name}>{'<'} to search</StyledRouterLink>
						<h2>{this.state.author.name}</h2>
					</HeaderContainer>
					<PaperContainer>
						<DataHeader>papers written:</DataHeader>
						<PaperList papers={this.state.author.papers} />
					</PaperContainer>
					<AuthorContainer>
						<DataHeader>co-authors:</DataHeader>
						<AuthorList authors={this.state.author.coAuthors} />
					</AuthorContainer>
				</div>
			);

		}


		return searchResult;
	}
}

let Author = withRouter(AuthorWithoutRouter);

export {Author};