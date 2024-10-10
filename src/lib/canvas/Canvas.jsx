import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "./canvas.css"; // Assuming the CSS is stored in canvas.css

const ChemistryDrawing = () => {
	const canvasRef = useRef(null);
	const canvasInstance = useRef(null);

	const subScriptOn = useRef(false);
	const superScriptOn = useRef(false);
	const mode = useRef("select");

	useEffect(() => {
		canvasInstance.current = new fabric.Canvas("a", {
			backgroundColor: "white",
		});
		canvasInstance.current.perPixelTargetFind = true;
		canvasInstance.current.targetFindTolerance = 4;

		document
			.getElementById("tofront")
			.addEventListener("click", enviarFrente);
		document
			.getElementById("toback")
			.addEventListener("click", enviarFondo);
		document
			.getElementById("toAdelante")
			.addEventListener("click", moverAdelante);
		document
			.getElementById("toAtras")
			.addEventListener("click", enviarAtras);
	}, []);

	const regularPolygonPoints = (sideCount, radius) => {
		const sweep = (Math.PI * 2) / sideCount;
		const cx = radius;
		const cy = radius;
		const points = [];
		for (let i = 0; i < sideCount; i++) {
			const x = cx + radius * Math.cos(i * sweep);
			const y = cy + radius * Math.sin(i * sweep);
			points.push({ x, y });
		}
		return points;
	};

	const addShape = (shapeType) => {
		const id = Date.now();
		let shape;
		switch (shapeType) {
			case "hexagon":
				shape = new fabric.Polygon(regularPolygonPoints(6, 50), {
					id,
					left: canvasInstance.current.width / 2,
					top: canvasInstance.current.height / 2,
					width: 100,
					height: 100,
					originX: "center",
					originY: "center",
					fill: "rgba(0,0,0,0)",
					stroke: "black",
					strokeWidth: 3,
				});
				break;
			case "rectangle":
				shape = new fabric.Rect({
					id,
					left: canvasInstance.current.width / 2,
					top: canvasInstance.current.height / 2,
					fill: "rgba(0,0,0,0)",
					stroke: "black",
					width: 50,
					height: 50,
					originX: "center",
					originY: "center",
					strokeWidth: 3,
				});
				break;
			case "triangle":
				shape = new fabric.Triangle({
					id,
					left: canvasInstance.current.width / 2,
					top: canvasInstance.current.height / 2,
					fill: "rgba(0,0,0,0)",
					stroke: "black",
					width: 44,
					height: 44,
					originX: "center",
					originY: "center",
					strokeWidth: 3,
				});
				break;
			default:
				break;
		}
		canvasInstance.current.add(shape);
	};

	const startDraw = () => {
		if (mode.current !== "pencil") {
			mode.current = "pencil";
			document.getElementById("button-draw").style.backgroundColor =
				"#707070";
			canvasInstance.current.isDrawingMode = true;
			canvasInstance.current.freeDrawingBrush.width = 3;
			fabric.PencilBrush.prototype.globalCompositeOperation =
				"source-over";
			canvasInstance.current.renderAll();
		} else {
			document.getElementById("button-draw").style.backgroundColor =
				"#333333";
			mode.current = "select";
			select();
		}
	};

	const clearCanvas = () => {
		canvasInstance.current.clear();
	};

	const select = () => {
		mode.current = "select";
		canvasInstance.current.isDrawingMode = false;
		canvasInstance.current.selection = true;
		canvasInstance.current.renderAll();
	};

	const saveCanvas = () => {
		console.log("Canvas saved");
	};

	const enviarFrente = () => {
		const myObject = canvasInstance.current.getActiveObject();
		canvasInstance.current.bringToFront(myObject);
		canvasInstance.current.discardActiveObject();
		canvasInstance.current.renderAll();
	};

	const enviarFondo = () => {
		const myObject = canvasInstance.current.getActiveObject();
		canvasInstance.current.sendToBack(myObject);
		canvasInstance.current.discardActiveObject();
		canvasInstance.current.renderAll();
	};

	const moverAdelante = () => {
		const myObject = canvasInstance.current.getActiveObject();
		canvasInstance.current.bringForward(myObject);
		canvasInstance.current.discardActiveObject();
		canvasInstance.current.renderAll();
	};

	const enviarAtras = () => {
		const myObject = canvasInstance.current.getActiveObject();
		canvasInstance.current.sendBackwards(myObject);
		canvasInstance.current.discardActiveObject();
		canvasInstance.current.renderAll();
	};

	return (
		<div>
			<h2>Chemistry Drawing</h2>
			<div className="container">
				<div className="button-container" id="button-container">
					<button
						id="button-draw"
						className="button"
						onClick={startDraw}
						title="Draw"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/draw.svg"
							alt="Draw"
						/>
					</button>
					<button
						id="button-clear"
						className="button"
						onClick={clearCanvas}
						title="Clear All"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/clear-all.svg"
							alt="Clear All"
						/>
					</button>
					<button
						id="button-select"
						className="button"
						onClick={select}
						title="Select"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/select.svg"
							alt="Select"
						/>
					</button>
					<button
						id="button-hex"
						className="button"
						onClick={() => addShape("hexagon")}
						title="Hexagon"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/hexagon.svg"
							alt="Hexagon"
						/>
					</button>
					<button
						id="button-pent"
						className="button"
						onClick={() => addShape("pentagon")}
						title="Pentagon"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/pentagon.svg"
							alt="Pentagon"
						/>
					</button>
					<button
						id="button-tri"
						className="button"
						onClick={() => addShape("triangle")}
						title="Triangle"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/triangle.svg"
							alt="Triangle"
						/>
					</button>
					<button
						id="button-rec"
						className="button"
						onClick={() => addShape("rectangle")}
						title="Rectangle"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/rectangle.svg"
							alt="Rectangle"
						/>
					</button>
					<button
						id="button-line-single"
						className="button"
						onClick={() => addShape("single")}
						title="Single Bond"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/single-bond.svg"
							alt="Single Bond"
						/>
					</button>
					<button
						id="button-line-double"
						className="button"
						onClick={() => addShape("double")}
						title="Double Bond"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/double-bond.svg"
							alt="Double Bond"
						/>
					</button>
					<button
						id="button-line-triple"
						className="button"
						onClick={() => addShape("triple")}
						title="Triple Bond"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/triple-bond.svg"
							alt="Triple Bond"
						/>
					</button>
					<button
						id="button-line-wedge"
						className="button"
						onClick={() => addShape("wedge")}
						title="Wedge"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/wedge.svg"
							alt="Wedge"
						/>
					</button>
					<button
						id="button-line-hash"
						className="button"
						onClick={() => addShape("hash")}
						title="Hash"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/hash.svg"
							alt="Hash"
						/>
					</button>
					<button
						id="button-save"
						className="button"
						onClick={saveCanvas}
						title="Save"
					>
						<img
							src="https://raw.githubusercontent.com/craigmateo/chemistry-drawing/77de15031ab1d4dab25e25269d46334f9143ddaa/assets/svg/save.svg"
							alt="Save"
						/>
					</button>
				</div>
				<div id="context-menu">
					<div className="item" id="toAdelante">
						Bring forward
					</div>
					<div className="item" id="tofront">
						Bring to front
					</div>
					<div className="item" id="toAtras">
						Send backwards
					</div>
					<div className="item" id="toback">
						Send to back
					</div>
				</div>
				<canvas id="a" width="632" height="500"></canvas>
			</div>
		</div>
	);
};

export default ChemistryDrawing;
