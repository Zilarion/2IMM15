// Libraries
import * as React from 'react';
import style, {keyframes} from 'styled-components';
import {withRouter} from "react-router";
import * as $ from 'jquery';
import {LoadingIndicator} from "../components/LoadingIndicator";
import {PaperList} from "../components/PaperList";
import {AuthorList} from "../components/AuthorList";
import {Link} from "react-router-dom";
import {AuthorItem} from "../components/AuthorItem";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PropertiesContainer = style.div`
	border-bottom: 1px solid ${(props: any) => props.theme.colors.divider};
	margin-bottom:  ${(props: any) => props.theme.margins.small};
`;

const IconBackContainer = style.div`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
	cursor: pointer;
	&:hover {
		color: ${(props: any) => props.theme.colors.hover};
	}
`;

const DataContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx4});
	padding: ${(props: any) => props.theme.margins.small};
	margin: ${(props: any) => props.theme.margins.small};
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	display: inline-block;
	animation: ${fadeIn} 200ms ease-in;
`;

const HeaderContainer = style.div`
	width: calc(100% - ${(props: any) => props.theme.margins.smallx2});
	padding: ${(props: any) => props.theme.margins.small};
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
	margin-left: ${(props: any) => props.theme.margins.medium};
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
		if (nextProps.match.params.id !== this.props.match.params.id)
			this.queryForUrl(nextProps.match.params.id);
	}

	render() {
		let searchResult;
		if (this.state.loading) {
			searchResult = <LoadingIndicator />
		} else {
			searchResult = (
				<DataContainer>
					<PropertiesContainer>
						<AuthorItem
							id={this.state.author.id}
							name={this.state.author.name}
							influence={this.state.author.influence}
							topics={this.state.author.topics}
							coAuthors={[]}
							animTime={0}
							showLink={false}
						/>
					</PropertiesContainer>
					<PaperContainer>
						<DataHeader>Papers written:</DataHeader>
						<PaperList papers={this.state.author.papers} />
					</PaperContainer>
					<AuthorContainer>
						<DataHeader>Co-authors:</DataHeader>
						<AuthorList authors={this.state.author.coAuthors} />
					</AuthorContainer>
				</DataContainer>
			);

		}

		return (
			<div>
				<HeaderContainer>
					<IconBackContainer onClick={this.props.history.goBack}>
						<i className="material-icons">arrow_back</i>
					</IconBackContainer>
				</HeaderContainer>
				{searchResult}
			</div>
		);
	}
}

let Author = withRouter(AuthorWithoutRouter);

export {Author};