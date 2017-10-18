// Libraries
import * as React from 'react';
import style from 'styled-components';
import {withRouter} from "react-router";
import * as $ from 'jquery';
import {LoadingIndicator} from "../components/LoadingIndicator";
import {AuthorList} from "../components/AuthorList";
import {PaperList} from "../components/PaperList";
import {Link} from "react-router-dom";
import {PaperItem} from "../components/PaperItem";


const StyledRouterLink = style(Link)`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
	&:hover {
	color: ${(props: any) => props.theme.colors.hover};
}`;

const HeaderContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
	padding: ${(props: any) => props.theme.margins.small};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	background-color: ${(props: any) => props.theme.colors.header};
`;

const DataContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx4});
	padding: ${(props: any) => props.theme.margins.small};
	margin: ${(props: any) => props.theme.margins.small};
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	display: inline-block;
`;

const AuthorContainer = style.div`
	display: inline-block;
	width: 50%;
	float: left;
`;

const PaperContainer = style.div`
	display: inline-block;
	width: 50%;
	float: right;
`;

const DataHeader = style.h4`
	margin: ${(props: any) => props.theme.margins.medium};
`;

interface PaperProps {
	history: any,
	match: any
}

interface PaperState {
	loading: boolean,
	paper: PaperType
}

class PaperWithoutRouter extends React.Component<PaperProps, PaperState> {
	constructor() {
		super();
		this.state = {
			loading: false,
			paper: undefined
		};
	}

	queryForUrl(id: string) {
		this.setState({
			... this.state,
			loading: true
		});
		let postData = {'domain': 'paper', 'query': parseInt(id, 10)};
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
					paper: data.paper
				})
			}
		});
	}

	componentWillMount() {
		this.queryForUrl(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps: PaperProps) {
		console.log(nextProps);
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
						<StyledRouterLink to={'/search/papers/' + this.state.paper.title}>{'<'} to search</StyledRouterLink>
					</HeaderContainer>
					<DataContainer>
						<PaperItem
							id={this.state.paper.id}
							title={this.state.paper.title}
							authors={this.state.paper.authors}
							link={this.state.paper.link}
							year={this.state.paper.year}
							topic={this.state.paper.topic}
							animTime={0}
						/>
						<AuthorContainer>
							<DataHeader>Authors:</DataHeader>
							<AuthorList authors={this.state.paper.authors} />
						</AuthorContainer>
						<PaperContainer>
							<DataHeader>Related papers:</DataHeader>
							<PaperList papers={[]} />
						</PaperContainer>
					</DataContainer>
				</div>
			);

		}

		return searchResult;
	}
}

let Paper = withRouter(PaperWithoutRouter);

export {Paper};