import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {connect, useDispatch, useSelector} from "react-redux";
import TextField from '@material-ui/core/TextField';
import EditIcon from "@material-ui/icons/Edit";
import {createCar} from "../../../actions/carAction";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import "./carModel.scss"

const CreateCarModal = ({car, active, setActive}) => {
    // debugger
    const error = useSelector(state => state.carsData.error);
    const dispatch = useDispatch()

    const [carData, setCarData] = useState(
        {
            id: car?.id,
            carVIN: car?.carVIN,
            carNumber: car?.carNumber,
            carModel: car?.carModel,
            carCategory: car?.carCategory,
            carColor: car?.carColor,
            carModelYear: car?.carModelYear,
        }
    )

    function handleOnValueChange(e) {
        // debugger
        setCarData({...carData, [e.target.id]: e.target.value}
        )
        console.log(carData)
    }

    function handleReset(e) {
        // e.preventDefault()
        setCarData({
            id: null,
            carVIN: null,
            carNumber: null,
            carModel: null,
            carCategory: null,
            carColor: null,
            carModelYear: null,
        })
        setActive(false)
    }


    function handleSubmit(e) {
        e.preventDefault();
        debugger
        dispatch(createCar(carData))
    }

    function reloadDataCar() {
        setCarData({
            id: carData?.id || car?.id || null,
            carVIN: carData?.carVIN || car?.carVIN || null,
            carNumber:   carData?.carNumber || car?.carNumber ||null,
            carModel:  carData?.carModel || car?.carModel || null,
            carCategory:  carData?.carCategory || car?.carCategory || null,
            carColor:  carData?.carColor || car?.carColor ||null,
            carModelYear:  carData?.carModelYear || car?.carModelYear || null,

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

                <form className="create-modal__form" onSubmit={(e) => handleSubmit(e)} onMouseOver={reloadDataCar}>

                    <Grid container spacing={2} justify={"center"}>

                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="VIN номер"
                                variant="outlined"
                                id="carVIN"
                                value={carData?.carVIN ? carData?.carVIN : car?.carVIN}
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
                                label="Номер"
                                variant="outlined"
                                id="carNumber"
                                value={carData?.carNumber ? carData?.carNumber : car?.carNumber}
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
                                label="Модель"
                                variant="outlined"
                                id="carModel"
                                value={carData?.carModel ? carData?.carModel : car?.carModel}
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
                                label="Категория"
                                variant="outlined"
                                id="carCategory"
                                value={carData?.carCategory ? carData?.carCategory : car?.carCategory}
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
                                label="Цвет"
                                variant="outlined"
                                id="carColor"
                                value={carData?.carColor ? carData?.carColor : car?.carColor}
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
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Год выпуска"
                                variant="outlined"
                                id="carModelYear"
                                value={carData?.carModelYear ? carData?.carModelYear : car?.carModelYear}
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
        error: state.carsData.error,
    };
}


export default connect(mapStateToProps, null)(CreateCarModal);