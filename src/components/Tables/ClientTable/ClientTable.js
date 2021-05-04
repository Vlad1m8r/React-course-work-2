import React from 'react';
import {history} from "../../../index";
import {fetchClients, deleteClient} from "../../../actions/clientAction";
import {connect} from "react-redux";
import Client from "./Client";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CreateClientModal from "../../Creaters/ClientCreater/createClientModal";

class ClientTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            createClientModal: false,
            oed: null,
        }
    }

    componentWillMount() {
        this.props.onFetch()

    }

    handleOnValueChange = (e) => {
        this.setState({...this.state, [e.target.id]: e.target.value})
    }
    setCreateClientModal = (data) => {
        this.setState({...this.state, createClientModal: data})
    }

    handleEdit = (client) => {
        debugger
        this.setState({...this.state, createClientModal: "true", oed: client})
    }
    handleEditNull = () => {
        debugger
        this.setState({...this.state, createClientModal: "true", oed: null})
    }

    render() {
        if (this.props.isLoading) {
            return (
                <p>Loading...}</p>
            )
        } else if (this.props.error) {
            return (
                <div className="alert-danger">
                    <p>Код ошибки</p>
                    {this.props.error.status}
                </div>
            )
        } else  {
            return (
                <div className="max_height">
                    <React.Fragment>
                        <IconButton aria-label="add" color="warning" align="right" className="add_btn"
                                    onClick={this.handleEditNull}
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
                                    <TableCell>Телефон</TableCell>
                                    <TableCell align="right">Удалить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.clients.map((row) => {
                                    return (
                                        <Client key={row.id}
                                             client={row}
                                             onDelete={this.props.onDelete}
                                             onEdit={this.handleEdit}/>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </React.Fragment>

                    <CreateClientModal
                        client={this.state.oed}
                        active={this.state.createClientModal}
                        setActive={this.setCreateClientModal}
                        handleOnValueChange={this.handleOnValueChange}
                    />

                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        clients: state.clientsData.clients || [],
        error: state.clientsData.error,
        isLoading: state.clientsData.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchClients())
        },
        onDelete: (id) => {
            dispatch(deleteClient(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ClientTable);