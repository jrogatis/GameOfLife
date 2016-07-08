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


var inicialGameArray = function (col,ln) {
	'use strict';
	var arrGame = [];
	var arrLine = [];
	for (var z = 0; z < ln; z++) {
		
			arrLine.push('x');
			
	}
	
	for (var i = 0; i < col; i++) {
		
		arrGame.push(arrLine);	
	
	}	
	
	return (arrGame);	
	
};

var GameTable = React.createClass ({
	handleClickOnCell: function (row,line){
			this.props.handleClickOnCell(row,line)
		
			
		},
	
	
	render : function() {
						
	return (
		<Well componentClass ={Table}>
		
				<GameTable.Body 
				arrGame={this.props.arrGame}
				handleClickOnCell={this.handleClickOnCell}
				/>
			
		</Well>
	);
	
	}
		
});

GameTable.Body = React.createClass({
	handleClickOnCell: function (row,line){
				this.props.handleClickOnCell(row,line)
			
			
		},
	render : function() {
			var rows = [];
			console.log (JSON.stringify(this.props.arrGame[0].length));
			//create a row with X col
			for (var i = 0; i < this.props.arrGame[0].length; i++){	

				var temp = <GameTable.Row  
							key={i}  
							id={i} 
							arrGame={this.props.arrGame}
							handleClickOnCell={this.handleClickOnCell}/>;
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
		handleClickOnCell: function (row,line){
				this.props.handleClickOnCell(row,line)
			
			
		},
	
	
	render : function() {
			var row = [];

			//create a row with X col
			for (var i = 0; i < this.props.arrGame.length; i++){	
				var value = this.props.arrGame[i][this.props.id];
				var temp = <GameTable.Col 
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
	
GameTable.Col = React.createClass({
		
		handleClickOnCell: function (){
		
			
			this.props.handleClickOnCell(this.props.rowId,this.props.id)
			
			return null;
		},
			
		
	
		render : function() {

			return (
				<td onClick={this.handleClickOnCell}> {this.props.val}  </td>
			
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
								<ButtonGroup><Button bsSize="large" >Run</Button>	</ButtonGroup>
								<ButtonGroup><Button bsSize="large">Pause</Button>	</ButtonGroup>
								<ButtonGroup><Button bsSize="large">Clear</Button>	</ButtonGroup>
							</ButtonGroup>
						</Col>
						<Col componentClass={ControlLabel} sm={3}>
							Generations
						</Col>
						 <Col sm={2}>
							<FormControl 
							type="Text"
							defaultValue= "300"
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
								<ButtonGroup><Button bsSize="large">Size: 50x30</Button>	</ButtonGroup>
								<ButtonGroup><Button bsSize="large">Size: 70x50</Button>	</ButtonGroup>
								<ButtonGroup><Button bsSize="large">Size: 100x80</Button>	</ButtonGroup>
							</ButtonGroup>
						</Col>
					</FormGroup>	
				<FormGroup controlId="formBottonSpeed">
						<Col componentClass={ControlLabel} sm={2}>
							Sim Speed:
						</Col>
						<Col  sm={10}	>
							<ButtonGroup justified id="buttonBottonSpeed" >
							
									<ButtonGroup><Button bsSize="large">Size: Slow</Button>	</ButtonGroup>
									<ButtonGroup><Button bsSize="large">Size: Medium</Button></ButtonGroup>
									<ButtonGroup><Button bsSize="large">Size: Fast</Button></ButtonGroup>
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
		
		 return {
			 
			 arrGame: inicialGameArray(50,30)
		 }
		  
	  },
	
	handleClickOnCell: function (row,line){
			
			alert ("row" +row + " line "+ line);
			
		},
	
	
	render: function (){
		
		return (
		
			<Col componentClass ={Well} id="tableBox" md={6} mdOffset={3} bsSize="small">
				<Header/> 
				<GameTable 
					arrGame = {this.state.arrGame}
					handleClickOnCell ={this.handleClickOnCell}
					/>
				<Botton/> 
			</Col>
		)
	}
	
});

ReactDOM.render((
   <Controler />
), document.getElementById('mountNode'));
