import { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }

    componentDidMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        } else {
            this.onClear();
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({ 
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status,
            });
        } else {
            this.onClear();
        };
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {!this.state.id ? 'Add task' : 'Update Task'}
						<span>
                            <i className="fa fa-times-circle text-right" onClick={this.onCloseForm}></i>
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                        </div>
                        <label>Status</label>

                        <select name="status" className="form-control" value={this.state.status} onChange={this.onChange} >
                            <option value={true}>Active</option>
                            <option value={false}>Hidden</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>
								Save
							</button>&nbsp;
							<button type="button" className="btn btn-danger" onClick={this.onClear}>
                                <i className="fa fa-close mr-5"></i>
								Cancel
							</button>
                        </div>
                    </form>
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
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        
		onCloseForm: () => {
			dispatch(actions.closeForm());
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);