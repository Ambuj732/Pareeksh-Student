import React from "react";


function Mathpad() {
	return (
		<>
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<title>MathPad</title>
			{/* Bootstrap */}
			<link
				href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
				rel="stylesheet"
			/>
			<link
				href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
				rel="stylesheet"
			/>
			<link
				href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
				rel="stylesheet"
			/>
			<link
				href="https://cdn.bootcss.com/bootstrap-submenu/2.0.4/css/bootstrap-submenu.min.css"
				rel="stylesheet"
			/>
			{/* include summernote css/js*/}
			<link
				href="https://cdn.bootcss.com/summernote/0.8.10/summernote.css"
				rel="stylesheet"
			/>
			{/*<style>
.note-editable.panel-body {
  max-height: 200px;
  overflow-y: scroll;
}

    </style>*/}
			{/* HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries */}
			{/* WARNING: Respond.js doesn't work if you view the page via file:// */}
			{/*[if lt IE 9]>
    
    
    <![endif]*/}
			<link
				href="https://cdn.bootcss.com/fullPage.js/2.9.5/jquery.fullpage.min.css"
				rel="stylesheet"
			/>
			<div id="mobile-wapper">
				<div id="fullpage">
					{/* SECTION EDIT */}
					<div
						id="page-edit"
						className="section fp-noscroll"
						data-anchor="edit"
					>
						<div className="container-fluid">
							<div className="row clearfix">
								<div className="col-xs-12 column">
									<div className="panel panel-default">
										<div
											className="panel-heading"
											style={{
												margin: 0,
												paddingTop: 0,
												paddingBottom: 0,
											}}
										>
											<div
												id="math-menus"
												className="row clearfix"
											>
												{/* MATH BUTTON */}
												<div className="btn-group btn-group-sm math-menu">
													<button
														type="button"
														className="btn btn-default"
														value="$$"
														title="$$"
													>
														<i className="fa fa-lg fa-dollar" />
														<i className="fa fa-lg fa-dollar" />
													</button>
												</div>
												{/* MATH MENUS */}
												{/* common */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="common"
														title="Common"
													>
														<i className="fa fa-lg fa-star-o" />
													</button>
													<ul
														className="dropdown-menu"
														role="menu"
														aria-labelledby="common"
													>
														<li>
															<div
																id="mnu-common"
																className="math-menu"
															></div>
														</li>
													</ul>
												</div>
												{/* binary relational ops */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="birelation"
														title="Relations, Ops"
													>
														$\leq$
													</button>
													<ul
														className="dropdown-menu"
														role="menu"
														aria-labelledby="birelation"
													>
														<li>
															<div
																id="mnu-relation"
																className="math-menu"
															></div>
														</li>
													</ul>
												</div>
												{/* derivative */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="sum-union"
														title="Derivative"
													>
														$\partial$
													</button>
													<ul
														className="dropdown-menu"
														role="menu"
														aria-labelledby="sum-union"
													>
														<li>
															<div
																id="mnu-derivative"
																className="math-menu"
															></div>
														</li>
													</ul>
												</div>
												{/* integral */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="sum-union"
														title="Integral"
													>
														$\int$
													</button>
													<ul
														className="dropdown-menu dropdown-menu-right"
														role="menu"
														aria-labelledby="sum-union"
													>
														<li>
															<div
																id="mnu-integral"
																className="math-menu"
															></div>
														</li>
													</ul>
												</div>
												{/* sum, mul, union, inter */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="sum-union"
														title="Sum,mul..."
													>
														$\sum$
													</button>
													<ul
														className="dropdown-menu dropdown-menu-right"
														role="menu"
														aria-labelledby="sum-union"
													>
														<li>
															<div
																id="mnu-sumprod"
																className="math-menu"
															></div>
														</li>
													</ul>
												</div>
												{/* greek */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="greek"
														title="Greek"
													>
														$\beta$
													</button>
													<ul
														className="dropdown-menu dropdown-menu-right"
														role="menu"
														aria-labelledby="greek"
													>
														<li>
															<div
																id="mnu-greek"
																className="math-menu"
															></div>
														</li>
													</ul>
												</div>
												{/* others */}
												<div className="btn-group btn-group-sm">
													<button
														type="button"
														className="btn btn-primary dropdown-toggle"
														data-toggle="dropdown"
														id="greek"
														title="More"
													>
														...
													</button>
													<ul
														className="dropdown-menu dropdown-menu-right"
														role="menu"
														aria-labelledby="greek"
													>
														<li>
															<div className="math-menu">
																<div
																	className="tabbable"
																	id="tabs-142114"
																>
																	<ul className="nav nav-tabs">
																		<li className="active">
																			<a
																				href="#panel-mt"
																				data-toggle="tab"
																				title="Matrix"
																			>
																				Mt
																			</a>
																		</li>
																		<li>
																			<a
																				href="#panel-fn"
																				data-toggle="tab"
																				title="Function"
																			>
																				Fn
																			</a>
																		</li>
																		<li>
																			<a
																				href="#panel-op"
																				data-toggle="tab"
																				title="Operator"
																			>
																				Op
																			</a>
																		</li>
																		<li>
																			<a
																				href="#panel-de"
																				data-toggle="tab"
																				title="Delimiter"
																			>
																				De
																			</a>
																		</li>
																		<li>
																			<a
																				href="#panel-ar"
																				data-toggle="tab"
																				title="Arrow & Font"
																			>
																				Ar&amp;Ft
																			</a>
																		</li>
																	</ul>
																	<div className="tab-content pull-right">
																		<div
																			className="tab-pane active"
																			id="panel-mt"
																		>
																			<table>
																				<tbody
																					align="center"
																					valign="middle"
																				>
																					<tr>
																						<td>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\ldots "
																							>
																								$\ldots$
																							</button>
																						</td>
																						<td>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\cdots "
																							>
																								$\cdots$
																							</button>
																						</td>
																						<td>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\vdots "
																							>
																								$\vdots$
																							</button>
																						</td>
																						<td>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\ddots "
																							>
																								$\ddots$
																							</button>
																						</td>
																						<td>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\begin{cases} a & b \\ c & d \end{cases}"
																								title="cases"
																							>
																								cases
																							</button>
																						</td>
																					</tr>
																					<tr>
																						<td
																							colSpan={
																								2
																							}
																						>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\begin{pmatrix} a & b \\ c & d \end{pmatrix}"
																								title="pmatrix"
																							>
																								$\begin
																								{
																									"{"
																								}
																								pmatrix
																								{
																									"}"
																								}{" "}
																								a
																								&amp;
																								b
																								\\
																								c
																								&amp;
																								d
																								\end
																								{
																									"{"
																								}
																								pmatrix
																								{
																									"}"
																								}
																								$
																							</button>
																						</td>
																						<td
																							colSpan={
																								3
																							}
																						>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\begin{pmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{m1} & \cdots & a_{mn} \end{pmatrix}"
																								title="pmatrix"
																							>
																								$\begin
																								{
																									"{"
																								}
																								pmatrix
																								{
																									"}"
																								}
																								a_
																								{
																									"{"
																								}
																								11
																								{
																									"}"
																								}{" "}
																								&amp;
																								\cdots
																								&amp;
																								a_
																								{
																									"{"
																								}
																								1n
																								{
																									"}"
																								}{" "}
																								\\
																								\vdots
																								&amp;
																								\ddots
																								&amp;
																								\vdots
																								\\
																								a_
																								{
																									"{"
																								}
																								m1
																								{
																									"}"
																								}{" "}
																								&amp;
																								\cdots
																								&amp;
																								a_
																								{
																									"{"
																								}
																								mn
																								{
																									"}"
																								}
																								\end
																								{
																									"{"
																								}
																								pmatrix
																								{
																									"}"
																								}
																								$
																							</button>
																						</td>
																					</tr>
																					<tr>
																						<td
																							colSpan={
																								2
																							}
																						>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\begin{bmatrix} a & b \\ c & d \end{bmatrix}"
																								title="pmatrix"
																							>
																								$\begin
																								{
																									"{"
																								}
																								bmatrix
																								{
																									"}"
																								}{" "}
																								a
																								&amp;
																								b
																								\\
																								c
																								&amp;
																								d
																								\end
																								{
																									"{"
																								}
																								bmatrix
																								{
																									"}"
																								}
																								$
																							</button>
																						</td>
																						<td
																							colSpan={
																								3
																							}
																						>
																							<button
																								type="button"
																								className="btn btn-default"
																								value="\begin{bmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{m1} & \cdots & a_{mn} \end{bmatrix}"
																								title="pmatrix"
																							>
																								$\begin
																								{
																									"{"
																								}
																								bmatrix
																								{
																									"}"
																								}
																								a_
																								{
																									"{"
																								}
																								11
																								{
																									"}"
																								}{" "}
																								&amp;
																								\cdots
																								&amp;
																								a_
																								{
																									"{"
																								}
																								1n
																								{
																									"}"
																								}{" "}
																								\\
																								\vdots
																								&amp;
																								\ddots
																								&amp;
																								\vdots
																								\\
																								a_
																								{
																									"{"
																								}
																								m1
																								{
																									"}"
																								}{" "}
																								&amp;
																								\cdots
																								&amp;
																								a_
																								{
																									"{"
																								}
																								mn
																								{
																									"}"
																								}
																								\end
																								{
																									"{"
																								}
																								bmatrix
																								{
																									"}"
																								}
																								$
																							</button>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</div>
																		<div
																			className="tab-pane"
																			id="panel-fn"
																		></div>
																		<div
																			className="tab-pane"
																			id="panel-op"
																		></div>
																		<div
																			className="tab-pane"
																			id="panel-de"
																		></div>
																		<div
																			className="tab-pane"
																			id="panel-ar"
																		></div>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div
											className="panel-body"
											style={{ paddingTop: 0 }}
										>
											{/* MATH INPUT */}
											<div className="row clearfix">
												<div id="MathInput" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>{" "}
					{/* END OF SECTION EDIT */}
					{/* SECTION WELCOME */}
					<div
						id="page-welcome"
						className="section fp-noscroll"
						style={{ display: "none" }}
						data-anchor="welcome"
					>
						<div className="container-fluid">
							<div className="row">
								<div className="col-xs-12 col-sm-5 col-md-4 column">
									<div className="panel panel-default">
										<div className="panel-heading">
											<a
												id="create"
												href="#"
												className="btn btn-info"
											>
												<h5 className="list-group-item-heading">
													<i className="fa fa-lg fa-file-o" />
													<b>New</b>
												</h5>
											</a>
											<span>&nbsp;</span>
											<a
												id="confirm-delete"
												href="#modal-del-confirm"
												role="button"
												className="btn btn-warning"
												data-toggle="modal"
												title="Remove it"
											>
												<h5 className="list-group-item-heading">
													<i className="fa fa-lg fa-trash" />
												</h5>
											</a>
											<div className="dropdown pull-right">
												<button
													className="btn btn-default dropdown-toggle"
													type="button"
													data-toggle="dropdown"
													data-submenu=""
													aria-expanded="false"
													title="Settings"
												>
													<i className="fa fa-lg fa-cog text-info" />
												</button>
												<ul className="dropdown-menu">
													<li className="dropdown-submenu dropdown-menu-right">
														<a tabIndex={0}>
															<i className="fa fa-lg fa-th-large text-info" />
															Themes
														</a>
														<ul
															className="dropdown-menu dropdown-menu-right"
															role="menu"
															aria-labelledby="themes"
														>
															<li>
																<a
																	href="#"
																	data-theme="default"
																	className="theme-link"
																>
																	Default
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="cerulean"
																	className="theme-link"
																>
																	Cerulean
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="cosmo"
																	className="theme-link"
																>
																	Cosmo
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="cyborg"
																	className="theme-link"
																>
																	Cyborg
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="darkly"
																	className="theme-link"
																>
																	Darkly
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="flatly"
																	className="theme-link"
																>
																	Flatly
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="journal"
																	className="theme-link"
																>
																	Journal
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="lumen"
																	className="theme-link"
																>
																	Lumen
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="paper"
																	className="theme-link"
																>
																	Paper
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="readable"
																	className="theme-link"
																>
																	Readable
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="sandstone"
																	className="theme-link"
																>
																	Sandstone
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="simplex"
																	className="theme-link"
																>
																	Simplex
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="slate"
																	className="theme-link"
																>
																	Slate
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="spacelab"
																	className="theme-link"
																>
																	Spacelab
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="superhero"
																	className="theme-link"
																>
																	Superhero
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="united"
																	className="theme-link"
																>
																	United
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-theme="yeti"
																	className="theme-link"
																>
																	Yeti
																</a>
															</li>
														</ul>
													</li>
													<li>
														<a
															id="show-hints-table"
															href="#modal-hints-table"
															role="button"
															data-toggle="modal"
														>
															<i className="fa fa-lg fa-magic text-info" />
															Hints...
														</a>
													</li>
													<li
														role="separator"
														className="divider"
													/>
													<li>
														<a
															href="#modal-container-about"
															data-toggle="modal"
														>
															<i className="fa fa-lg text-info fa-question-circle" />
															About...
														</a>
													</li>
												</ul>
											</div>
											<a
												href="#modal-sliding-mode"
												className="btn pull-right"
												data-toggle="modal"
												title="Sliding mode"
											>
												<i
													id="sliding-mode-indicator"
													className=""
												/>
											</a>
										</div>
										<div className="panel-body">
											<div className="list-group">
												<div
													id="snippets-list"
													style={{
														overflowY: "auto",
													}}
												></div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-7 col-md-8 column hidden-xs">
									<div className="jumbotron">
										<h1 className="visible-md-block visible-lg-block">
											<a href="javascript:$.fn.fullpage.moveSectionDown();">
												<i className="fa fa-dollar fa-lg text-success" />
												<i className="fa fa-dollar text-success" />
											</a>
											Math Pad
										</h1>
										<h2 className="visible-sm-block">
											<a href="javascript:$.fn.fullpage.moveSectionDown();">
												<i className="fa fa-dollar fa-lg text-success" />
												<i className="fa fa-dollar text-success" />
											</a>
											Math Pad
										</h2>
										<p>
											Write <b>formatted text</b> with{" "}
											<b>LaTeX formula</b>!
										</p>
										<p id="math-example">
											$$f(a) = {"{"}1 \over 2\pi i{"}"}
											\oint_\gamma {"{"}f(z) \over z-a
											{"}"} dz$$
										</p>
										<p>Enjoy it!</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* SECTION PREVIEW */}
					<div
						id="page-preview"
						className="section"
						style={{ display: "none" }}
						data-anchor="preview"
					>
						<div className="container-fluid">
							<button
								id="printit"
								type="button"
								className="btn btn-default pull-right hidden-xs"
								title="Print"
							>
								<i className="fa fa-print" />
							</button>
							<div className="row">
								<div id="PrintView">
									<div
										id="MathPreview"
										style={{
											border: "0px solid",
											padding: 20,
											width: "90%",
											marginTop: 5,
										}}
									/>
									<div
										id="MathBuffer"
										style={{
											border: "0px solid",
											padding: 20,
											width: "90%",
											marginTop: 5,
											visibility: "hidden",
											position: "absolute",
											top: 0,
											left: 0,
										}}
									/>
								</div>
							</div>
						</div>
					</div>{" "}
					{/* END OF SECTION PREVIEW */}
				</div>{" "}
				{/* END OF FULLPAGE */}
			</div>{" "}
			{/* END OF mobile-wapper */}
			<div
				className="modal fade"
				id="modal-hints-table"
				role="dialog"
				aria-labelledby="myModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-hidden="true"
							>
								×
							</button>
							<div className="tabbable" id="tabs-header">
								<ul className="nav nav-tabs">
									<li id="tab-hints-all" className="active">
										<a
											href="#panel-hints-all"
											data-toggle="tab"
										>
											<b>
												All hints{" "}
												<span
													className="badge"
													id="hints-count"
												/>
											</b>
										</a>
									</li>
									<li>
										<a
											href="#panel-my-hints"
											data-toggle="tab"
										>
											<b>My hints</b>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="modal-body">
							<div className="tabbable" id="tabs-content">
								<div className="tab-content">
									<div
										className="tab-pane active"
										id="panel-hints-all"
									>
										{/* hints table */}
										<div
											id="hintstmpls"
											style={{
												overflowY: "auto",
												height: 180,
											}}
										>
											<table className="table">
												<thead>
													<tr>
														<th>Hint</th>
														<th>Code</th>
														<th>Disp.</th>
													</tr>
												</thead>
												<tbody id="hints-table"></tbody>
											</table>
										</div>
									</div>
									<div
										className="tab-pane"
										id="panel-my-hints"
									>
										<div className="control-group">
											<div className="controls">
												<div className="textarea">
													<textarea
														id="myhints-conf"
														type=""
														className="col-xs-12"
														style={{ height: 100 }}
														defaultValue={""}
													/>
													<p className="help-block">
														FORMAT:{" "}
														<b
															className="text-success"
															title="Replace (hint) with (code), menu display in desktop and/or phone; (.) required, [.] optional"
														>
															(hint) ## (code) [##
															[display] ##
															[display phone]]
														</b>
														<br />
														<i className="fa fa-hand-o-right" />{" "}
														<span
															className="text-info"
															title="Replace xa with \alpha"
														>
															xa ## \alpha
														</span>
														<br />
														<i className="fa fa-hand-o-right" />{" "}
														<span
															className="text-info"
															title="Replace sqrt with \sqrt, show 'sqrt' in menu"
														>
															sqrt ## \sqrt{"{"}{" "}
															{"}"} ## sqrt
														</span>
														<br />
														<i className="fa fa-hand-o-right" />{" "}
														<span
															className="text-info"
															title="Replace rq with the root of a quadratic equation, show 'root of quadr. eq' in menu at phone"
														>
															rq ## {"{"}
															-b\pm\sqrt{"{"}
															b^2-4ac{"}"} \over
															2a{"}"} ## ## root
															of quadr. eq
														</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<div
								className="form-group"
								style={{ display: "inline", float: "left" }}
							>
								<input
									type="text"
									className="form-control"
									id="hints-filter"
									placeholder="filter"
									title="Filter hints"
								/>
							</div>
							<button
								id="hints-btn-close"
								type="button"
								className="btn btn-default"
								data-dismiss="modal"
								style={{ display: "inline" }}
							>
								Close
							</button>
							<button
								id="hints-btn-save"
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
			{/*  */}
		</>
	);
}

export default Mathpad;
