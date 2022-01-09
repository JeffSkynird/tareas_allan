
import React, { Component,forwardRef }  from 'react';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutlineOutlined';
import Edit from '@material-ui/icons/EditOutlined';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import SaveIcon from '@material-ui/icons/Save';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ImportExportIcon from '@material-ui/icons/ImportExportOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import TelegramIcon from '@material-ui/icons/Telegram';
import RefreshIcon from '@material-ui/icons/Refresh';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import PaymentIcon from "@material-ui/icons/Payment";
import GetAppIcon from '@material-ui/icons/GetApp';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import EventIcon from '@material-ui/icons/Event';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
export const TableIcons = {
    
    RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox  {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    LibraryAddCheckIcon: forwardRef((props, ref) => <LibraryAddCheckIcon {...props} ref={ref} />),
    IndeterminateCheckBoxIcon: forwardRef((props, ref) => <IndeterminateCheckBoxIcon {...props} ref={ref} />),
    ImportExportIcon: forwardRef((props, ref) => <ImportExportIcon {...props} ref={ref} />),
    VisibilityOutlinedIcon: forwardRef((props, ref) => <VisibilityOutlinedIcon {...props} ref={ref} />),
    MailOutlineIcon: forwardRef((props, ref) => <MailOutlineIcon {...props} ref={ref} />),
    AssignmentIndIcon: forwardRef((props, ref) => <AssignmentIndIcon {...props} ref={ref} />),
    TelegramIcon: forwardRef((props, ref) => <TelegramIcon {...props} ref={ref} />),
    FormatListNumberedRtlIcon: forwardRef((props, ref) => <FormatListNumberedRtlIcon {...props} ref={ref} />),
    PaymentIcon: forwardRef((props, ref) => <PaymentIcon {...props} ref={ref} />),
    GetAppIcon: forwardRef((props, ref) => <GetAppIcon {...props} ref={ref} />),
    AutorenewIcon: forwardRef((props, ref) => <AutorenewIcon {...props} ref={ref} />),
    PhoneInTalkIcon:forwardRef((props, ref) => <PhoneInTalkIcon {...props} ref={ref} />),
    EventIcon:forwardRef((props, ref) => <EventIcon {...props} ref={ref} />),
    AccountCircleIcon:forwardRef((props, ref) => <AccountCircleIcon {...props} ref={ref} />),
    SaveIcon:forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
    MonetizationOnIcon:forwardRef((props, ref) => <MonetizationOnIcon {...props} ref={ref} />)

    
    
  };
export const LocalizationTable = {
    pagination: {
        labelDisplayedRows: '{from}-{to} of {count}'
    },
    toolbar: {
        nRowsSelected: '{0} fila(s) seleccionada',
        searchPlaceholder:'Buscar'
    },
    pagination:{
        labelRowsSelect: 'filas',
    } ,
    header: {
        actions: ''
    },
    body: {
        emptyDataSourceMessage: 'No hay datos por mostrar',
        filterRow: {
            filterTooltip: 'Filter'
        }
    }
}

export const removeAccent = (str) => {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }