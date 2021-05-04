import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {connect, useDispatch, useSelector} from "react-redux";
import TextField from '@material-ui/core/TextField';
import EditIcon from "@material-ui/icons/Edit";
import {createDriver} from "../../../actions/driverAction";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import "./CreateDriver.scss"

const CreateDriverModal = ({driver, active, setActive}) => {
    // debugger
    const error = useSelector(state => state.driversData.error);
    const dispatch = useDispatch()

    const [driverData, setDriverData] = useState(
        {
            id: driver?.id,
            firstName: driver?.firstName,
            lastName: driver?.lastName,
            email: driver?.email,
            phoneNumber: driver?.phoneNumber,
            gender: driver?.gender,
            address: driver?.address,
            driverLicenseIssueDate: driver?.driverLicenseIssueDate,
        }
    )

    function handleOnValueChange(e) {
        // debugger
        setDriverData({...driverData, [e.target.id]: e.target.value}
        )
        console.log(driverData)
    }

    function handleReset(e) {
        // e.preventDefault()
        setDriverData({
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            gender: null,
            address: null,
            driverLicenseIssueDate: null,
        })
        setActive(false)
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(driverData);
        debugger
        dispatch(createDriver(driverData))
    }

    function reloadDataDriver() {
        setDriverData({
            id: driverData?.id || driver?.id || null,
            firstName: driverData?.firstName || driver?.firstName || null,
            lastName:   driverData?.lastName || driver?.lastName ||null,
            email:  driverData?.email || driver?.email || null,
            phoneNumber:  driverData?.phoneNumber || driver?.phoneNumber || null,
            gender:  driverData?.gender || driver?.gender ||null,
            address:  driverData?.address || driver?.address || null,
            driverLicenseIssueDate :   driverData?.driverLicenseIssueDate || driver?.driverLicenseIssueDate || null,

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

                <form className="create-modal__form" onSubmit={(e) => handleSubmit(e)} onMouseOver={reloadDataDriver}>

                    <Grid container spacing={2} justify={"center"}>

                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Имя"
                                variant="outlined"
                                id="firstName"
                                value={driverData?.firstName ? driverData?.firstName : driver?.firstName}
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
                                value={driverData?.lastName ? driverData?.lastName : driver?.lastName}
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
                                label="Email"
                                variant="outlined"
                                id="email"
                                value={driverData?.email ? driverData?.email : driver?.email}
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
                                label="Телефон"
                                variant="outlined"
                                id="phoneNumber"
                                value={driverData?.phoneNumber ? driverData?.phoneNumber : driver?.phoneNumber}
                                type="text"
                                fullWidth
                                name="phoneNumber"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Пол"
                                variant="outlined"
                                id="gender"
                                value={driverData?.gender ? driverData?.gender : driver?.gender}
                                type="text"
                                fullWidth
                                name="gender"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={8} md={8} lg={8}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Адрес"
                                variant="outlined"
                                id="address"
                                value={driverData?.address ? driverData?.address : driver?.address}
                                type="text"
                                name="address"
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
                                label="Лицензия"
                                variant="outlined"
                                id="driverLicenseIssueDate"
                                value={driverData?.driverLicenseIssueDate ? driverData?.driverLicenseIssueDate : driver?.driverLicenseIssueDate}
                                type="text"
                                name="driverLicenseIssueDate"
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
                            {/*<button type="button"*/}
                            {/*        onClick={(e) => handleReset(e)}*/}
                            {/*    // onClick={this.handleReset.bind(this)}*/}
                            {/*>Закрыть*/}
                            {/*</button>*/}

                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.driversData.error,
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onAdd: (driver) => {
//             dispatch(createDriver(driver));
//         }
//     }
// }

export default connect(mapStateToProps, null)(CreateDriverModal);