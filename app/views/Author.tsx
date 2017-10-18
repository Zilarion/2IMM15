// Libraries
import * as React from 'react';
import style from 'styled-components';
import {withRouter} from "react-router";
import * as $ from 'jquery';
import {LoadingIndicator} from "../components/LoadingIndicator";
import {PaperList} from "../components/PaperList";

const Container = style.div`

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
				console.log(data);
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

	render() {
		console.log(this.state);
		let searchResult;
		if (this.state.loading) {
			searchResult = <LoadingIndicator />
		} else {
			searchResult = (
				<div>
					<span>{this.state.author.name}</span>
					<PaperList papers={this.state.author.papers} />
				</div>
			);

		}


		return (
			<Container>
				{searchResult}
			</Container>
		);
	}
}

let Author = withRouter(AuthorWithoutRouter);

export {Author};