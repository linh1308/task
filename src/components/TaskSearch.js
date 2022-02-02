import { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/index';

class TaskSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" name="keyword" placeholder="Type the keyword..." className="form-control" value={this.state.keyword} onChange={this.onChange} />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-primary" onClick={this.onSearch} >
                        <span className="fa fa-search mr-5"></span>
                        Search
                    </button>
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSearch);