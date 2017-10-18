// Libraries
import * as React from 'react';
import style, {keyframes} from 'styled-components';
import {withRouter} from "react-router";
import * as $ from 'jquery';
import {LoadingIndicator} from "../components/LoadingIndicator";
import {AuthorList} from "../components/AuthorList";
import {PaperList} from "../components/PaperList";
import {Link} from "react-router-dom";
import {PaperItem} from "../components/PaperItem";


const PropertiesContainer = style.div`
	border-bottom: 1px solid ${(props: any) => props.theme.colors.divider};
	margin-bottom:  ${(props: any) => props.theme.margins.small};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const IconBackContainer = style.div`
	text-decoration: none;
	color: ${(props: any) => props.theme.colors.accent};
	cursor: pointer;
	&:hover {
		color: ${(props: any) => props.theme.colors.hover};
	}
`;


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
	animation: ${fadeIn} 200ms ease-in;
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
						<IconBackContainer onClick={this.props.history.goBack}>
							<i className="material-icons">arrow_back</i>
						</IconBackContainer>
					</HeaderContainer>
					<DataContainer>
						<PropertiesContainer>
							<PaperItem
								id={this.state.paper.id}
								title={this.state.paper.title}
								authors={[]}
								link={this.state.paper.link}
								year={this.state.paper.year}
								topic={this.state.paper.topic}
								animTime={0}
							/>
						</PropertiesContainer>
						<PaperContainer>
							<DataHeader>Related papers:</DataHeader>
							<PaperList papers={[]} />
						</PaperContainer>
						<AuthorContainer>
							<DataHeader>Authors:</DataHeader>
							<AuthorList authors={this.state.paper.authors} />
						</AuthorContainer>
					</DataContainer>
				</div>
			);

		}

		return searchResult;
	}
}

let Paper = withRouter(PaperWithoutRouter);

export {Paper};