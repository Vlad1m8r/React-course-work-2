import React, {useState} from 'react';
import Driver from "./Driver";
import {connect} from "react-redux";
import {fetchDrivers} from "../../../actions/driverAction";
import {history} from "../../../index";
import {deleteDriver} from "../../../actions/driverAction";
import SortIcon from '@material-ui/icons/Sort';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import CreateDriverModal from "../../Creaters/DriverCreater/createDriverModal";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

class DriverTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createDriverModal: false,
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
    setCreateDriverModal = (data) => {
        this.setState({...this.state, createDriverModal: data})
    }

    handleEdit = (driver) => {
        debugger
        this.setState({...this.state, createDriverModal: "true", oed: driver})
    }

    handleCityFilter = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.checked})
        if (e.target.checked) {
            this.props.onFilter(e.target.value)
        } else
            this.props.onFilter("%")
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
        } else {
            return (
                <div className="max_height">
                    <React.Fragment>
                        <IconButton aria-label="add" color="warning" align="right" className="add_btn"
                                    onClick={() => history.push('/createDriver')}
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
                                    <TableCell>Лицезия</TableCell>
                                    <TableCell align="right">Удалить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.drivers.map((row) => {
                                    return (
                                        <Driver key={row.id}
                                                driver={row}
                                                onDelete={this.props.onDelete}
                                                onEdit={this.handleEdit}/>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </React.Fragment>


                    <CreateDriverModal
                        driver={this.state.oed}
                        active={this.state.createDriverModal}
                        setActive={this.setCreateDriverModal}
                        handleOnValueChange={this.handleOnValueChange}
                    />

                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        drivers: state.driversData.drivers || [],
        error: state.driversData.error,
        isLoading: state.driversData.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchDrivers())
        },
        onDelete: (id) => {
            dispatch(deleteDriver(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverTable);