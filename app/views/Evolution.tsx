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
		image.src = 'https://raw.githubusercontent.com/JeroenvanDoorenmalen/Information_retrieval/master/final_areachart.png';
		image.onload = () => {
			this.setState({
				image
			});
		}
		const image1 = new window.Image();
		image1.src = 'https://raw.githubusercontent.com/JeroenvanDoorenmalen/Information_retrieval/master/final_barchart.png';
		image1.onload = () => {
			this.setState({
				image1
			});
		}
	}

	render() {
		return (
			<Stage width={2400} height={1500}>
				<Layer>
					<Image
						image={this.state.image}
						y={0}
						x={500}
					/>
					<Image
						image={this.state.image1}
						y={750}
						x={500}
					/>
				</Layer>
			</Stage>
		);
	}
}

export { Evolution };
