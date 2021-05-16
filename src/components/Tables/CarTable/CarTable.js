import React from 'react';
import {history} from "../../../index";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {fetchCars, deleteCars} from "../../../actions/carAction";
import {connect} from "react-redux";
import Car from "./Car";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CreateCarModal from "../../Creaters/CarCreater/carCreateModal";


class CarTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            createCarModal: false,
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
    setCreateCarModal = (data) => {
        this.setState({...this.state, createCarModal: data})
    }

    handleEdit = (car) => {
        debugger
        this.setState({...this.state, createCarModal: "true", oed: car})
    }


    handleSetCar = (car) => {
        history.push({
            pathname: `/createCar/${car.id}`,
            state: {
                car: car,
            }
        })
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
                // <div className="car">
                <div className="max_height">
                    <React.Fragment>
                        <IconButton aria-label="add" color="warning" align="right" className="add_btn"
                                    onClick={() => history.push('/createCar')}
                        >
                            <AddCircleOutlineOutlinedIcon />
                            Добавить
                        </IconButton>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>VIN номер</TableCell>
                                    <TableCell>номер</TableCell>
                                    <TableCell>Модель</TableCell>
                                    <TableCell>Категория</TableCell>
                                    <TableCell>Цвет</TableCell>
                                    <TableCell align="right">Год выпуска</TableCell>
                                    <TableCell align="right">Удалить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.cars.map((row) => {
                                    return (
                                        <Car key={row.id}
                                             car={row}
                                             onDelete={this.props.onDelete}
                                             onEdit={this.handleEdit.bind(this)}/>
                                             )
                                })}
                            </TableBody>
                        </Table>
                    </React.Fragment>

                    <CreateCarModal
                        car={this.state.oed}
                        active={this.state.createCarModal}
                        setActive={this.setCreateCarModal}
                        handleOnValueChange={this.handleOnValueChange}
                    />

                </div>

            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        cars: state.carsData.cars || [],
        error: state.carsData.error,
        isLoading: state.carsData.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchCars())
        },
        onDelete: (id) => {
            dispatch(deleteCars(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CarTable);