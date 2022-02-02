import { Component } from "react";
import TaskSearch from './TaskSearch'
import TaskSort from './TaskSort'

class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* Search */}
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <TaskSearch />
                </div>

                {/* Sort */}
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <TaskSort />
                </div>
            </div>
        );
    }
}

export default TaskControl;