import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {connect, useDispatch, useSelector} from "react-redux";
import TextField from '@material-ui/core/TextField';
import EditIcon from "@material-ui/icons/Edit";
import {createClient} from "../../../actions/clientAction";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import "./clientModal.scss"

const CreateClientModal = ({client, active, setActive}) => {
    // debugger
    const error = useSelector(state => state.clientsData.error);
    const dispatch = useDispatch()

    const [clientData, setClientData] = useState(
        {
            id: client?.id,
            firstName: client?.firstName,
            lastName: client?.lastName,
            phoneNumber: client?.phoneNumber,
        }
    )

    function handleOnValueChange(e) {
        // debugger
        setClientData({...clientData, [e.target.id]: e.target.value}
        )
        console.log(clientData)
    }

    function handleReset(e) {
        // e.preventDefault()
        setClientData({
            id: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
        })
        setActive(false)
    }


    function handleSubmit(e) {
        e.preventDefault();
        debugger
        dispatch(createClient(clientData))
    }

    function reloadDataClient() {
        setClientData({
            id: clientData?.id || client?.id || null,
            firstName: clientData?.firstName || client?.firstName || null,
            lastName:   clientData?.lastName || client?.lastName ||null,
            phoneNumber:  clientData?.phoneNumber || client?.phoneNumber || null,

        })
    }

    return (
        <div id="modal" className={active ? "create-modal active" : "create-modal"} onClick={(e) => handleReset(e)}>


            <div className="create-modal__content" onClick={e => e.stopPropagation()}>
                {error ?
                    <div className="alter-danger" role='alert'>
                        {error}
                    </div> : ""
                }

                <form className="create-modal__form" onSubmit={(e) => handleSubmit(e)} onMouseOver={reloadDataClient}>

                    <Grid container spacing={2} justify={"center"}>

                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Имя"
                                variant="outlined"
                                id="firstName"
                                value={clientData?.firstName ? clientData?.firstName : client?.firstName}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Фамилия"
                                variant="outlined"
                                id="lastName"
                                value={clientData?.lastName ? clientData?.lastName : client?.lastName}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Телефон"
                                variant="outlined"
                                id="phoneNumber"
                                value={clientData?.phoneNumber ? clientData?.phoneNumber : client?.phoneNumber}
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
                                onClick={(e) => handleReset(e)}
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
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.clientsData.error,
    };
}

export default connect(mapStateToProps, null)(CreateClientModal);