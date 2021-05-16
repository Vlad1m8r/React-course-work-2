import React from 'react';
import {history} from "../../../index";
import {fetchDispatchers, deleteDispatcher} from "../../../actions/dispatcherAction";
import {connect} from "react-redux";
import Dispatcher from "./Dispatcher";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CreateDispatcherModal from "../../Creaters/DispathcerCreater/CreateDispathcer";

class DispatcherTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            createDispatcherModal: false,
            oed: null,
            checkedB: false,
            checkedA: false,
        }
    }

    componentWillMount() {
        this.props.onFetch()
    }

    handleOnValueChange = (e) => {
        this.setState({...this.state, [e.target.id]: e.target.value})
    }
    setCreateDispatcherModal = (data) => {
        this.setState({...this.state, createDispatcherModal: data})
    }

    handleEdit = (dispatcher) => {
        debugger
        this.setState({...this.state, createDispatcherModal: "true", oed: dispatcher})
    }

    render() {
        if (this.props.isLoading) {
            return (
                <p>Loading...</p>
            )
        } else if (this.props.error) {
            return (
                //className="alert-danger" role="alert"
                <div>
                    {this.props.error.message}
                </div>
            )
        } else  {
            return (
                <div className="max_height">
                    <React.Fragment>
                        <IconButton aria-label="add" color="warning" align="right" className="add_btn"
                                    onClick={() => history.push('/createDispatcher')}
                        >
                            <AddCircleOutlineOutlinedIcon />
                            Добавить
                        </IconButton>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Фамилия</TableCell>
                                    <TableCell>Почта</TableCell>
                                    <TableCell>Телефон</TableCell>
                                    <TableCell>Пол</TableCell>
                                    <TableCell>Адрес</TableCell>
                                    <TableCell>ЗП</TableCell>
                                    <TableCell>SSN</TableCell>
                                    <TableCell align="right">Удалить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.dispatchers.map((row) => {
                                    return (
                                        <Dispatcher key={row.id}
                                                dispatcher={row}
                                                onDelete={this.props.onDelete}
                                                onEdit={this.handleEdit}/>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </React.Fragment>

                    <CreateDispatcherModal
                        dispatcher={this.state.oed}
                        active={this.state.createDispatcherModal}
                        setActive={this.setCreateDispatcherModal}
                        handleOnValueChange={this.handleOnValueChange}
                    />

                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        dispatchers: state.dispatchersData.dispatchers || [],
        error: state.dispatchersData.error,
        isLoading: state.dispatchersData.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchDispatchers())
        },
        onDelete: (id) => {
            dispatch(deleteDispatcher(id)) //!!!!!!!!!!!!!!!!!!!
        },

        // onFilter: (city) => {
        //     dispatch(fetchUsersFilterByCity(city)) //!!!!!!!!!!!!!!
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (DispatcherTable);