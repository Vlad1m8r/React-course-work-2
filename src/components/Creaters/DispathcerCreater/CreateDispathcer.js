import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {connect, useDispatch, useSelector} from "react-redux";
import TextField from '@material-ui/core/TextField';
import EditIcon from "@material-ui/icons/Edit";
import {createDispatcher} from "../../../actions/dispatcherAction";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import "./crDisp.scss"

const CreateDispatcherModal = ({dispatcher, active, setActive}) => {
    // debugger
    const error = useSelector(state => state.dispatchersData.error);
    const dispatch = useDispatch()

    const [dispatcherData, setDispatcherData] = useState(
        {
            id: dispatcher?.id,
            firstName: dispatcher?.firstName,
            lastName: dispatcher?.lastName,
            email: dispatcher?.email,
            phoneNumber: dispatcher?.phoneNumber,
            gender: dispatcher?.gender,
            address: dispatcher?.address,
            salary: dispatcher?.salary,
            ssn: dispatcher?.ssn,
        }
    )

    function handleOnValueChange(e) {
        // debugger
        setDispatcherData({...dispatcherData, [e.target.id]: e.target.value}
        )
        console.log(dispatcherData)
    }

    function handleReset(e) {
        // e.preventDefault()
        setDispatcherData({
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
        setActive(false)
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(dispatcherData);
        debugger
        dispatch(createDispatcher(dispatcherData))
    }

    function reloadDataDispatcher() {
        setDispatcherData({
            id: dispatcherData?.id || dispatcher?.id || null,
            firstName: dispatcherData?.firstName || dispatcher?.firstName || null,
            lastName:   dispatcherData?.lastName || dispatcher?.lastName ||null,
            email:  dispatcherData?.email || dispatcher?.email || null,
            phoneNumber:  dispatcherData?.phoneNumber || dispatcher?.phoneNumber || null,
            gender:  dispatcherData?.gender || dispatcher?.gender ||null,
            address:  dispatcherData?.address || dispatcher?.address || null,
            salary :   dispatcherData?.salary || dispatcher?.salary || null,
            ssn :   dispatcherData?.ssn || dispatcher?.ssn || null,

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

                <form className="create-modal__form" onSubmit={(e) => handleSubmit(e)} onMouseOver={reloadDataDispatcher}>

                    <Grid container spacing={2} justify={"center"}>


                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Имя"
                                variant="outlined"
                                id="firstName"
                                value={dispatcherData?.firstName ? dispatcherData?.firstName : dispatcher?.firstName}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Фамилия"
                                variant="outlined"
                                id="lastName"
                                value={dispatcherData?.lastName ? dispatcherData?.lastName : dispatcher?.lastName}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Телефон"
                                variant="outlined"
                                id="phoneNumber"
                                value={dispatcherData?.phoneNumber ? dispatcherData?.phoneNumber : dispatcher?.phoneNumber}
                                type="text"
                                fullWidth
                                name="phoneNumber"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Пол"
                                variant="outlined"
                                id="gender"
                                value={dispatcherData?.gender ? dispatcherData?.gender : dispatcher?.gender}
                                type="text"
                                fullWidth
                                name="gender"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Email"
                                variant="outlined"
                                id="email"
                                value={dispatcherData?.email ? dispatcherData?.email : dispatcher?.email}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Адрес"
                                variant="outlined"
                                id="address"
                                value={dispatcherData?.address ? dispatcherData?.address : dispatcher?.address}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Зарплата"
                                variant="outlined"
                                id="salary"
                                value={dispatcherData?.salary ? dispatcherData?.salary : dispatcher?.salary}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="SSN"
                                variant="outlined"
                                id="ssn"
                                value={dispatcherData?.ssn ? dispatcherData?.ssn : dispatcher?.ssn}
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
        error: state.dispatchersData.error,
    };
}


export default connect(mapStateToProps, null)(CreateDispatcherModal);