import * as React from 'react';
import {Image, Layer, Rect, Stage} from "react-konva";

// https://github.com/lavrton/react-konva
interface EvolutionProps {
}

class Evolution extends React.Component<EvolutionProps, {image: any}> {
	constructor() {
		super();
		this.state = {
			image: undefined
		};
	}

	componentDidMount() {
		const image = new window.Image();
		image.src = 'http://konvajs.github.io/assets/yoda.jpg';
		image.onload = () => {
			this.setState({
				image: image
			});
		}
	}

	render() {
		return (
			<Stage width={700} height={700}>
				<Layer>
					<Rect
						x={300}
						y={10}
						width={50}
						height={50}
						fill={'black'}
						shadowBlur={5}
					/>
					<Image
						image={this.state.image}
						y={50}
					/>
				</Layer>
			</Stage>
		);
	}
}

export { Evolution };