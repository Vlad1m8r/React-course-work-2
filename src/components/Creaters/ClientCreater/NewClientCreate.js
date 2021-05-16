import React from 'react';

import {createClient} from "../../../actions/clientAction";

import {connect} from "react-redux";
import {history} from "../../../index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import "./create.css"

class NewClientCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
        }

    }


    componentWillMount() {
        const props = this.props
        if (props.location && props.location.state) {
            const client = props.location.state.client
            this.setState({
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                phoneNumber: client.phoneNumber,
            })
        }
    }

    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/client"})
        this.setState({
            id: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
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
            this.state.phoneNumber == null
        )
            alert("Телефон не заполнен!!")
        else{
            this.props.onAdd(this.state)}
    }

    render() {
        return (
            <div className="create">

                <form className="create-modal__form" onSubmit={this.handleSubmit.bind(this)}>

                    <Grid container spacing={2} justify={"center"}>

                        <Grid item xs={12} md={12} lg={12}>
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
                        <Grid item xs={12} md={12} lg={12}>
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
                        <Grid item xs={12} md={12} lg={12}>
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
                            <Button variant="contained" color="primary"
                                    size="large" className="btn-save"
                                    startIcon={<SaveIcon/>}
                                    type="submit"
                                    fullWidth
                            >
                                Сохранить изменения
                            </Button>
                        </Grid>
                        {/*<button type="submit">Создать</button>*/}

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
        error: state.clientsData.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (client) => {
            dispatch(createClient(client));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewClientCreate);