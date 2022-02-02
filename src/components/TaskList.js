import { Component } from "react";
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // 1: Hidden, 0: Active, -1: All
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        let filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

    render() {
        let { tasks, filterTable, search, sort } = this.props;
        if (filterTable.name) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
            });
        };

        tasks = tasks.filter((task) => {
            if (filterTable.status === -1) {
                return task;
            } else {
                return task.status === (filterTable.status === 1 ? true : false);
            };
        });

        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            });
        };

        let elementTask = tasks.map((task, index) => {
            return <TaskItem key={task.id} index={index} task={task} />
        });

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Index</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" name="filterName" className="form-control" value={filterTable.name} onChange={this.onChange} />
                                </td>
                                <td>
                                    <select type="text" name="filterStatus" className="form-control" value={filterTable.status} onChange={this.onChange} >
                                        <option value="-1">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Hidden</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elementTask}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        search: state.search,
        sort: state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);