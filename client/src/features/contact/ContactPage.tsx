import { Button, ButtonGroup, Typography } from '@mui/material';
import { decrement, increment } from './counterSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';

const ContactPage = () => {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter);
    // const data = useSelector((state: CounterState) => state.data);
    // const title = useSelector((state: CounterState) => state.title);
    
    return (
        <>
        <div>Yooooo</div>
            <Typography gutterBottom variant='h3'>{title}</Typography>
            <Typography variant='h4'>The data is: {data}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
                <Button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
                <Button onClick={() => dispatch(increment(5))} variant='contained' color='secondary'>Increment by 5</Button>
            </ButtonGroup>
        </>

    )
}

export default ContactPage;