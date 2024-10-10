import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

function MathPadPreview({ content }) {
	return (
		<MathJaxContext>
			<MathJax>{Content}</MathJax>
		</MathJaxContext>
	);
}

export default MathPadPreview;
