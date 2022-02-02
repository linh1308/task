import { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskSort extends Component {
    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    render() {
        let { sort } = this.props;
        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="menu-1" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="true">
                    Sort
                    <span className="fa fa-caret-square-o-down ml-5"></span>
                </button>
                <div className="dropdown-menu" aria-labelledby="menu-1">
                    <li onClick={() => this.onClick('name', 1)} >
                        <a href="#123" role="button" className={sort.by === 'name' && sort.value === 1 ? 'sort-selected' : ''} >
                            <span className="fa fa-sort-alpha-asc pr-5"></span>
                            Name A-Z
                        </a>
                    </li>
                    <li onClick={()=>{this.onClick('name', -1)}} >
                        <a href="#123" role="button" className={sort.by === 'name' && sort.value === -1 ? 'sort-selected' : ''} >
                            <span className="fa fa-sort-alpha-desc pr-5"></span>
                            Name Z-A
                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li onClick={() => this.onClick('status', 1)}>
                        <a href="#123" role="button" className={sort.by === 'status' && sort.value === 1 ? 'sort-selected' : ''} >Active Status</a>
                    </li>
                    <li onClick={()=>this.onClick('status', -1)} >
                        <a href="#123" role="button" className={sort.by === 'status' && sort.value === -1 ? 'sort-selected' : ''} >Hidden Status</a>
                    </li>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSort);