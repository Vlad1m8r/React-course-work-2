import React, {useState} from 'react';
import {connect} from "react-redux";
import {fetchOrders, deleteOrder} from "../../../actions/orderAction";
import {history} from "../../../index";
import Order from "./Order";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CreateOrderModal from "../../Creaters/OrderCreater/createOrderModal";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

class OrderTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createOrderModal: false,
            oed: null,
            checkedB: false,
            checkedA: false,

        }
    }
    setCreateOrderModal = (data) => {
        this.setState({...this.state, createOrderModal: data})
    }
    handleOnValueChange = (e) => {
        this.setState({...this.state, [e.target.id]: e.target.value})
    }

    componentWillMount() {
        this.props.onFetch()
    }

    handleEdit = (order) => {
        this.setState({...this.state, createOrderModal: "true", oed: order})
    }

    render() {
        if (this.props.isLoading) {
            return (
                <p>Loading...</p>
            )
        } else if (this.props.error) {
            return (
                <div>
                    {this.props.error.message}
                </div>
            )
        } else {
            return (
                <div className="max_height">
                    {/*--------------------------*/}

                    {/*------------------------------*/}
                    <React.Fragment>
                        <IconButton aria-label="add" color="warning" align="right" className="add_btn"
                                    onClick={() => history.push('/createOrder')}
                        >
                            <AddCircleOutlineOutlinedIcon />
                            Добавить
                        </IconButton>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"center"} width={1}>#</TableCell>
                                    <TableCell align={"center"} width={115}>Дата</TableCell>
                                    <TableCell align={"center"} width={50}>Время</TableCell>
                                    <TableCell align={"center"} width={50}>Минут</TableCell>
                                    <TableCell align={"center"} width={50}
                                               onClick={() => this.props.sortByDistance(this.props.sortByDistanceBool)}>
                                        Километров
                                    </TableCell>
                                    <TableCell align={"center"} width={50}>Рублей</TableCell>
                                    <TableCell align={"center"} width={200}>
                                        <InputLabel htmlFor="input-with-icon-adornment" />
                                        <Input
                                            id="input-with-icon-adornment"
                                            onChange={(e) => this.props.searchBy(e.target.value)}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon/>
                                                </InputAdornment>
                                            }
                                        />
                                        Улица (от)
                                    </TableCell>
                                    <TableCell align={"center"} width={200}>Улица (куда)</TableCell>
                                    <TableCell align="center" width={150}>Удалить/Изменить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.orders.map((row) => {
                                    return (
                                        <Order key={row.id}
                                                order={row}
                                                onDelete={this.props.onDelete}
                                                onEdit={this.handleEdit}/>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </React.Fragment>

                    <CreateOrderModal
                        order={this.state.oed}
                        active={this.state.createOrderModal}
                        setActive={this.setCreateOrderModal}
                        handleOnValueChange={this.handleOnValueChange}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    // debugger
    return {
        orders: state.ordersData.orders || [],
        error: state.ordersData.error,
        isLoading: state.ordersData.isLoading,
        sortByDistanceBool: state.ordersData.sortByDistanceBool,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchOrders())
        },

        onDelete: (id) => {
            dispatch(deleteOrder(id))
        },
        sortByDistance: (data) => {
            dispatch({type: "СОРТИРОВКА_ПО_ДИСТАНЦИИ", payload: data})
        },

        searchBy : (data) => {
            dispatch({type: "ПОИСК", payload: data})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);