import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { RootState } from '../../Store';


export default function FullPageLoadingDisplay() {

    const loader = useSelector((state: RootState) => state.uiTriggerReducer.showLoader);

    return (
        <div>
            <Modal
                show={loader}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            </Modal>
        </div>
    )
}
