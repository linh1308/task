import { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdateTask = () => {
        this.props.onOpenForm();
        this.props.onUpdateTask(this.props.task);
    }

    render() {
        let { task, index } = this.props;

        return (
            <tr>
                <td>{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status === true ? "label label-success" : "label label-danger"} onClick={this.onUpdateStatus} >{ task.status === true ? "Active" : "Hidden" }</span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdateTask} >
                        <span className="fa fa-pencil mr-5"></span>
						Edit
					</button>&nbsp;
					<button type="button" className="btn btn-danger" onClick={this.onDelete} >
                        <span className="fa fa-trash mr-5" aria-hidden="true"></span>
						Delete
					</button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },

        onDelete: (id) => {
            dispatch(actions.deleteTask(id));
        },

        onCloseForm: () => {
            dispatch(actions.closeForm());
        },

        onOpenForm: () => {
            dispatch(actions.openForm());
        },

        onUpdateTask: (task) => {
            dispatch(actions.updateTask(task));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);