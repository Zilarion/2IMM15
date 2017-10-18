// Libraries
import * as React from 'react';
import style from 'styled-components';
import {withRouter} from "react-router";
import * as $ from 'jquery';
import {LoadingIndicator} from "../components/LoadingIndicator";
import {AuthorList} from "../components/AuthorList";

const HeaderContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
	padding: ${(props: any) => props.theme.margins.small};
	padding-bottom: 0px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	background-color: ${(props: any) => props.theme.colors.header};
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

	render() {
		let searchResult;
		if (this.state.loading) {
			searchResult = <LoadingIndicator />
		} else {
			searchResult = (
				<div>
					<HeaderContainer>
						<h2>{this.state.paper.title} ({this.state.paper.year})</h2>
					</HeaderContainer>
					<div>
						<a href={this.state.paper.link}>View paper</a>
					</div>
					<AuthorList authors={this.state.paper.authors} />
				</div>
			);

		}

		return searchResult;
	}
}

let Paper = withRouter(PaperWithoutRouter);

export {Paper};