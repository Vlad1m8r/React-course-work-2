import React from 'react';

import {createCar} from "../../../actions/carAction";

import {connect} from "react-redux";
import {history} from "../../../index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import "./create.css"

class NewCarCreate extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            id: null,
            carVIN: null,
            carNumber: null,
            carModel: null,
            carCategory: null,
            carColor: null,
            carModelYear: null,
        }

    }


    componentWillMount() {
        const props = this.props
        if (props.location && props.location.state) {
            const car = props.location.state.car
            this.setState({
                id: car.id,
                carVIN: car.carVIN,
                carNumber: car.carNumber,
                carModel: car.carModel,
                carCategory: car.carCategory,
                carColor: car.carColor,
                carModelYear: car.carModelYear,
            })
        }
    }

    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/car"})
        this.setState({
            id: null,
            carVIN: null,
            carNumber: null,
            carModel: null,
            carCategory: null,
            carColor: null,
            carModelYear: null,
        })
    }

    handleOnValueChange(e) {
        this.setState({
                [e.target.id]: e.target.value,
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        if (
            this.state.carVIN == null ||
            this.state.carNumber == null ||
            this.state.carModel == null ||
            this.state.carCategory == null ||
            this.state.carColor == null ||
            this.state.carModelYear == null
        )
            alert("Не все поля заполнены!!")
        else{
            this.props.onAdd(this.state)}
    }

    render() {
        return (
            <div className="create">

                <form className="create-modal__form" onSubmit={this.handleSubmit.bind(this)}>

                    < Grid container spacing={2} justify={"center"}>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="VIN номер"
                                variant="outlined"
                                id="carVIN"
                                value={this.state.carVIN}
                                type="text"
                                name="firstName"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Номер"
                                variant="outlined"
                                id="carNumber"
                                value={this.state.carNumber}
                                type="text"
                                name="lastName"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Модель"
                                variant="outlined"
                                id="carModel"
                                value={this.state.carModel}
                                type="text"
                                fullWidth
                                name="phoneNumber"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="carCategory">
                                <option disabled selected value> -- Выберите категорию --</option>
                                <option id="carCategory"
                                        value="A"
                                        selected={(this.state?.carCategory === "A") ? "selected" : false}>A</option>
                                <option id="carCategory"
                                        value="B"
                                        selected={(this.state?.carCategory === "B") ? "selected" : false}>B</option>
                                <option id="carCategory"
                                        value="C"
                                        selected={(this.state?.carCategory === "C") ? "selected" : false}>C</option>
                            </select>

                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Цвет"
                                variant="outlined"
                                id="carColor"
                                value={this.state.carColor}
                                type="color"
                                name="color"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Год выпуска"
                                variant="outlined"
                                id="carModelYear"
                                value={this.state.carModelYear}
                                type="year"
                                name="address"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>



                        <Grid item xs={6} md={6} lg={6}>
                            <Button variant="contained" color="primary"
                                    size="large" className="btn-save"
                                    startIcon={<SaveIcon/>}
                                    type="submit"
                                    fullWidth
                            >
                                Сохранить изменения
                            </Button>
                        </Grid>

                        <Grid item xs={6} md={6} lg={6}>

                            <Button
                                onClick={(e) => this.handleReset(e)}
                                size="large"
                                variant="contained"
                                color="secondary"
                                className="btn-close"
                                fullWidth
                                startIcon={<CloseIcon/>}
                            >
                                Закрыть
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        error: state.carsData.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (car) => {
            dispatch(createCar(car));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCarCreate);