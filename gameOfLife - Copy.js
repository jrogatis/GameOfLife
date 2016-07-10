// JavaScript Document


// Define references to global var ReactBootstrap
const {

  Modal,
  Button,
  Grid,
  Col,
  Row,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  ButtonGroup,
  Table,
  thead,
  tbody,
  tr,
  td,
  Well	
	
} = ReactBootstrap;



var inicialGameArray = function (row,col) {
	 'use strict';
	var gameBoard = [];
	
	
	for (var i = 0; i < row; i++) {
		var arrLine = [];
			
		for (var z = 0; z < col; z++) {
		
			arrLine.push(Math.round(Math.random()));			
		}
	
		gameBoard.push(arrLine);
	
	}	
	
	return (gameBoard);	
	
};

var GameTable = React.createClass ({
	
	handleClickOnCell: function (row,col){
			this.props.handleClickOnCell(row,col)	
			
		},
	
	
	render : function() {
						
	return (
		<Well componentClass ={Table}>
		
				<GameTable.Body 
				gameBoard={this.props.gameBoard}
				handleClickOnCell={this.handleClickOnCell}
			
				/>
			
		</Well>
	);
	
	}
		
});

GameTable.Body = React.createClass({
	
	handleClickOnCell: function (row,col){
		
			this.props.handleClickOnCell(row,col)			
			
	},
	
	render : function() {
			var rows = [];
			//create a row with X col
			for (var i = 0; i < this.props.gameBoard[0].length; i++){	

				var temp = <GameTable.Row  
							key={i}  
							id={i} 
							gameBoard={this.props.gameBoard}
							handleClickOnCell={this.handleClickOnCell}
					
						
							/>;
				rows.push(temp);
			};	
		
			return (
				<Table>
					<tbody>
						{rows} 
					</tbody>
				</Table>
			);
	}	
	
});
	
GameTable.Row = React.createClass({
	
		handleClickOnCell: function (row,col){
				this.props.handleClickOnCell(row,col)
			
		},
	
	
	render : function() {
			var row = [];

			//create a row with X col
			for (var i = 0; i < this.props.gameBoard.length; i++){	
				var value = this.props.gameBoard[i][this.props.id];
				var temp = <GameTable.Cell 
							key={i} 
							rowId={this.props.id} 
							id={i} 
							val={value}
							handleClickOnCell = {this.handleClickOnCell}	
							
								  />;
				row.push(temp);
			};	
		
			return (
				<tr>
					{row} 
				</tr>
			
			);
	}
});
	
GameTable.Cell = React.createClass({
	
		getInitialState: function () {
			
			return {
				CellSelected: "notLive"
			}
			
		},
		
		handleClickOnCell: function (){
		
			
			this.props.handleClickOnCell(this.props.rowId,this.props.id)
			
			this.setState({
				
				CellSelected: "liveAge1"
			})
			
			return null;
		},
			
		componentDidMount: function () {
			
			if ( this.props.val === 1)  {			
				this.setState({				
					CellSelected: "liveAge1"
				})
			} else {				
				this.setState({				
					CellSelected: "notLive"
				})		
			} 						
		},
	
		componentWillReceiveProps: function (nextProps) {
			
				
			
			if ( nextProps.val === 1)  {	
				
				if ( this.state.CellSelected=== "liveAge1"){
					
					this.setState({				
						CellSelected: "liveAge2"

					}) 
					
				} else if ( this.state.CellSelected=== "liveAge2"){
					
					this.setState({				
						CellSelected: "liveAge3"

					})	
					
				} else {
						
						this.setState({				
						CellSelected: "liveAge1"

						})
					
					}										
				
			} else if  (nextProps.val === 0) {	
				
				this.setState({				
					CellSelected: "notLive"
					
				})		
			}						
		},
	
		render : function() {

			return (
				<td 
					className ={this.state.CellSelected}
					onClick={this.handleClickOnCell}>
						{this.props.val} 
				</td>
			
			);
	}	
	
});

var Header = React.createClass ({
	
	render: function (){
		
		return (
			<Well id="Header">
				<h1 id="Title"> Game of Life </h1>
				<Form horizontal>
					<FormGroup controlId="formHorizontalGenerations">
						<Col  sm={7}>
							<ButtonGroup justified id="buttonHeader" >
								<ButtonGroup><Button
									active={(this.props.runState === true) ? true : false}
									bsSize="large" 
									onClick={this.props.handleStartClick}>
										Run
									</Button></ButtonGroup>
								<ButtonGroup><Button 
									active={(this.props.pauseState === true) ? true : false}
									bsSize="large"
									onClick={this.props.handleStopClick}>
										Pause
								</Button></ButtonGroup>
								<ButtonGroup><Button bsSize="large">Clear</Button>	</ButtonGroup>
							</ButtonGroup>
						</Col>
						<Col componentClass={ControlLabel} sm={3}>
							Generations:
						</Col>
						 <Col sm={2}>							
							<FormControl 
							readOnly
							type="Text"
							value={this.props.gameScore}
							bsSize="large"
							/>
						</Col>
				   	</FormGroup>
				 </Form>
			</Well>
		);
			
	}
	
	
});

var Botton = React.createClass ({	
	
	handleTableSize: function (e){
		
		this.props.handleTableSize(e.target.id)
		
	},
	
	handleSpeed: function (e) {
		
			this.props.handleSpeed(Number(e.target.id))
		
	},
	
	render: function () {
		return (
		
			<Well id="Botton">
				<Form horizontal>
					<FormGroup controlId="formBottonSize">
						<Col componentClass={ControlLabel} sm={2}>
							Board Size:
						</Col>
						<Col  sm={10}	>
							<ButtonGroup justified  id="buttonBottonSize" >
								<ButtonGroup><Button
									active={(this.props.activeSize === "Small") ? true : false}
									bsSize="large"
									id ="Small"
									onClick= {this.handleTableSize}
									>
										Size: 50x30
									</Button></ButtonGroup>
								<ButtonGroup><Button 
									active={(this.props.activeSize === "Medium") ? true : false}
									bsSize="large"
									id ="Medium"
									onClick= {this.handleTableSize}
									>
										Size: 70x50
								</Button>	</ButtonGroup>
								<ButtonGroup><Button 
									active={(this.props.activeSize === "Large") ? true : false}
									bsSize="large"
									id ="Large"
									onClick= {this.handleTableSize}
									>
										Size: 100x80
								</Button>	</ButtonGroup>
							</ButtonGroup>
						</Col>
					</FormGroup>	
				<FormGroup controlId="formBottonSpeed">
						<Col componentClass={ControlLabel} sm={2}>
							Sim Speed:
						</Col>
						<Col  sm={10}	>
							<ButtonGroup justified id="buttonBottonSpeed" >
							
									<ButtonGroup><Button
													active={(this.props.speed === 2000) ? true : false}
													bsSize="large"
													id="2000"
													onClick={this.handleSpeed}
												>
													Slow
									</Button></ButtonGroup>
									<ButtonGroup><Button 
													active={(this.props.speed === 1000) ? true : false} 
													bsSize="large"
													id="1000"
													onClick={this.handleSpeed}
												>
													Medium
									</Button></ButtonGroup>
									<ButtonGroup><Button
													active={(this.props.speed === 250) ? true : false}
													bsSize="large"
													id="250"
													onClick={this.handleSpeed}
													>
														Fast
									</Button></ButtonGroup>
							</ButtonGroup>
						</Col>
					</FormGroup>	
				  
				 </Form>
			</Well>
		
		);
		
	}
	
	
});

var Controler = React.createClass ({
		
	getInitialState: function() {
		
		 return ({
			
			 gameBoard: inicialGameArray(50,30),
			 activeSize: "Small",
			 speed: 2000,
			 gameScore: 0,
			run : false,
			pause: false,
		
		 } )
		  	
	},	
	
	componentDidMount: function (){
		
		this.state.interv = setInterval(this.nextGen,this.state.speed);	
		this.setState({
			run : true,
			pause: false,
		})
	},
	
	nextGen: function() {
		
		//create a board to be next same quant of rows of actual
		var boardNext = new Array(this.state.gameBoard.length);
		// for each row 
		for (var i = 0; i < this.state.gameBoard.length; i++) {
			//create  cells
			boardNext[i] = new Array(this.state.gameBoard[i].length);
		}
		
		//for each row 
		for (var x = 0; x < this.state.gameBoard.length; x++) {
			// for each cel in that row
			for (var y = 0; y < this.state.gameBoard[x].length; y++) {
				var n = 0;
				var dxToCheck;
				var dyToCheck;
				//check the neighbors cells
				//first drift the rows from above and below
				for (var dx = -1; dx <= 1; dx++) {
					//then to left and right cells
					for (var dy = -1; dy <= 1; dy++) {
						// if its not the current cell
						if ( dx === 0 && dy === 0){}					
						else  {

								//if the row its the fist row (0)
								//drift to last row array.length 
								if (x===0 && dx === -1) {

									dxToCheck = this.state.gameBoard.length -1;
								//if the row its the last one {this.board.lengh}
								//drift to first one 
								} else if (x===this.state.gameBoard.length -1 && dx === 1){
									 dxToCheck = 0;
								//if its not th first or the last row then 	
								} else {
									dxToCheck = x+dx; 
								 }
							
								//if the cell is the first one
								// drift to the other side .. (this.board[x].lengh)
								if (y===0 && dy === -1) {

									dyToCheck = this.state.gameBoard[x].length -1;
									//if the row its the last one {this.board.lengh}
									//drift to first one 
								} else if (y===this.state.gameBoard[x].length -1 && dy === 1){
									 dyToCheck = 0;
								 } else {
									 dyToCheck = y+dy;
								 }
													
								if (this.state.gameBoard[dxToCheck][dyToCheck] === 1 ) {
									n++;
								}								
							}
						
					}//end for drift y
								
				}//end for drift x
							
								
				var c = this.state.gameBoard[x][y];
				switch (n) {
					case 0:
					case 1:
						c = 0;
						break;
					case 2:
						break; 
					case 3:
						c = 1;
						break;
					default:
						c = 0;
				}
				boardNext[x][y] = c;
			}
		}
		
		this.setState({
				gameBoard: boardNext.slice(),
				gameScore: this.state.gameScore + 1
		})
		
		

	},
	
	handleClear: function() {
		
		
	};
	
	handleSpeed: function(speedToSet){
		console.log(speedToSet);
		clearInterval(this.state.interv);
			this.setState({
				speed : speedToSet
			})
		this.state.interv = setInterval(this.nextGen,speedToSet);		
	},
	
	handleStopClick: function(){
		
		clearInterval(this.state.interv);
		
		this.setState({
			run : false,
			pause: true,
		})
	},
	
	handleStartClick: function(){
	
		this.state.interv = setInterval(this.nextGen,this.state.speed);	
		this.setState({
			run : true,
			pause: false,
		})
		
	},	
	
	handleTableSize: function(size) {
			
		var lines;
		var cols;	
		switch(size) {
				
			case "Small":	
				 lines = 30;
				 cols = 50;
				break;
				
			case "Medium":	
				 lines = 50;
				 cols = 70;
				break;
				
			case "Large":	
				 lines = 80;
				 cols = 100;	
				break;
		}
	
		this.setState({
				
				gameBoard:inicialGameArray(cols,lines),
				activeSize:size
		});	
		
	},
	
	handleClickOnCell: function (row,col){
		
		var newBoard = this.state.gameBoard
			newBoard[col][row] = "1";
	
		//(newBoard[col][row]);
		
			
			this.setState ({
				
				gameBoard:newBoard
			})
			
			
	},
	
	render: function (){
		
		return (
		
			<Col componentClass ={Well} id="tableBox" md={6} mdOffset={3} bsSize="small">
				<Header 
					gameScore={this.state.gameScore}
					handleStartClick={this.handleStartClick}
					handleStopClick={this.handleStopClick}
					runState={this.state.run} 
					pauseState={this.state.pause} 
				/> 
				<GameTable 
					gameBoard = {this.state.gameBoard}
					handleClickOnCell ={this.handleClickOnCell}
				
					/>
				<Botton
					handleTableSize={this.handleTableSize}
					activeSize={this.state.activeSize}
					handleSpeed={this.handleSpeed}
					speed={this.state.speed}
				/> 
			</Col>
		)
	}
	
});

ReactDOM.render((
   <Controler/>
), document.getElementById('mountNode'));
