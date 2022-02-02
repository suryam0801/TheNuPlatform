import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { CategorisedMessage } from '../../../Models/CategorisedMessage';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CategorisedMessages() {

    const categorisedMessages = useSelector((state: RootState) => state.chatsState.categorisedMessages)

    return (
        <div>
            <h2 style={{color:'white'}}>Your Messages Breakdown</h2>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {categorisedMessages.map((categorisedMessage: CategorisedMessage, index: number) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Item>
                                {categorisedMessage.Category}
                                :  {categorisedMessage.Messages.length}
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}