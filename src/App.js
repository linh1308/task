import './App.css';
import { Component } from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
	onDisplayForm = () => {
		let { itemEditing } = this.props;
		if (itemEditing && itemEditing.id !== '') {
			this.props.onOpenForm();
		} else {
			this.props.onToggleForm();
		}
		this.props.onClearTask({
			id: '',
			name: '',
			status: false
		});
	}

	onShowForm = () => {
		this.setState({
			isDisplayForm: true
		})
	}

	render() {
		let { isDisplayForm } = this.props;

		return (
			<div className="container">
				<div className="text-center">
					<h1>Task Management</h1>
				</div>

				<div className="row">
					<div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
						{/* Form */}
						<TaskForm />
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button type="button" className="btn btn-primary" onClick={this.onDisplayForm}>
							<span className="fa fa-plus mr-5"></span>
							Add Task
						</button>
						{/* Search-Sort */}
						<TaskControl />
						{/* List */}
						<TaskList />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDisplayForm: state.isDisplayForm,
		itemEditing: state.itemEditing
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm: () => {
			dispatch(actions.toggleForm());
		},

		onClearTask: (task) => {
			dispatch(actions.updateTask(task));
		},

		onOpenForm: () => {
			dispatch(actions.openForm());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);