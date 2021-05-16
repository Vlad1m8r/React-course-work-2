import React from 'react';

import {createDispatcher} from "../../../actions/dispatcherAction";

import {connect} from "react-redux";
import {history} from "../../../index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import "./create.css"

class NewDispatcherCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            gender: null,
            address: null,
            salary: null,
            ssn: null,
        }

    }


    componentWillMount() {
        const props = this.props
        if (props.location && props.location.state) {
            const dispatcher = props.location.state.dispatcher
            this.setState({
                id: dispatcher.id,
                firstName: dispatcher.firstName,
                lastName: dispatcher.lastName,
                email: dispatcher.email,
                phoneNumber: dispatcher.phoneNumber,
                gender: dispatcher.gender,
                address: dispatcher.address,
                salary: dispatcher.salary,
                ssn: dispatcher.ssn,
            })
        }
    }

    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/dispatcher"})
        this.setState({
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            gender: null,
            address: null,
            salary: null,
            ssn: null,
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
            this.state.firstName == null ||
            this.state.lastName == null ||
            this.state.email == null ||
            this.state.phoneNumber == null ||
            this.state.gender == null ||
            this.state.address == null ||
            this.state.salary == null ||
            this.state.ssn == null
        )
            alert("Не все поля заполнены!!")
        else{
            this.props.onAdd(this.state)}
    }

    render() {
        return (
            <div className="create">

                <form className="create-modal__form" onSubmit={this.handleSubmit.bind(this)}>

                    <Grid container spacing={2} justify={"center"}>


                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Имя"
                                variant="outlined"
                                id="firstName"
                                value={this.state.firstName}
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
                                label="Фамилия"
                                variant="outlined"
                                id="lastName"
                                value={this.state.lastName}
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
                                label="Телефон"
                                variant="outlined"
                                id="phoneNumber"
                                value={this.state.phoneNumber}
                                type="text"
                                fullWidth
                                name="phoneNumber"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="gender">
                                <option disabled selected value> -- Выберите Пол --</option>
                                <option id="gender"
                                        value="Девушка"
                                        selected={(this.state?.gender === "Девушка") ? "selected" : false}>Девушка</option>
                                <option id="gender"
                                        value="Мужчина"
                                        selected={(this.state?.gender === "Мужчина") ? "selected" : false}>Мужчина</option>
                            </select>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Email"
                                variant="outlined"
                                id="email"
                                value={this.state.email}
                                type="email"
                                name="email"
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
                                label="Адрес"
                                variant="outlined"
                                id="address"
                                value={this.state.address}
                                type="text"
                                name="address"
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
                                label="Зарплата"
                                variant="outlined"
                                id="salary"
                                value={this.state.salary}
                                type="text"
                                name="dispatcherLicenseIssueDate"
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
                                label="SSN"
                                variant="outlined"
                                id="ssn"
                                value={this.state.ssn}
                                type="text"
                                name="dispatcherLicenseIssueDate"
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
        error: state.dispatchersData.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (dispatcher) => {
            dispatch(createDispatcher(dispatcher));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDispatcherCreate);